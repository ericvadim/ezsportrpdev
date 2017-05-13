<?php


class Game_record_model extends CI_Model
{
    private $table = 'game_records';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows($gameId)
    {
        $query = "
            SELECT A.*, B.team_name, C.player_number, D.first_name, D.last_name, E.position_name 
            FROM (
              SELECT * FROM " . $this->table . " WHERE game_id=" . $gameId . "
            ) AS A  
            LEFT JOIN teams AS B ON B.id = A.team_id 
            LEFT JOIN players AS C ON C.id=A.player_id 
            LEFT JOIN persons AS D ON D.id=C.person_id 
            LEFT JOIN positions AS E ON E.id=C.position_id 
            ORDER BY D.first_name, D.last_name 
        ";
        return $this->db->query($query)->result();
    }

    public function getTeamStats1($clubId)
    {
        $CI =& get_instance();

        $CI->load->model('team_model');
        $CI->load->model('record_item_model');

        $teams = $CI->team_model->getRows($clubId);
        $recordItems = $CI->record_item_model->getRows();

        $teamIds = array();
        if (sizeof($teams)) {
            foreach ($teams as $team) {
                $teamIds[] = $team->id;
            }
        }

        $teamIdsStr = implode(',', $teamIds);
        $playedCntTbl = "
            SELECT A.team_id, COUNT(A.team_id) AS P_cnt 
            FROM (
                (   SELECT home_team_id AS team_id  
                    FROM game_schedules 
                    WHERE home_team_id IN (" . $teamIdsStr . ") AND `status`=2
                ) UNION ALL (
                    SELECT away_team_id   
                    FROM game_schedules 
                    WHERE away_team_id IN (" . $teamIdsStr . ") AND `status`=2
                )
            ) AS A 
            GROUP BY team_id 
        ";

        $select = "SELECT A.id, A.team_name, B.club_name, P.P_cnt";
        $query = "
            FROM (
                SELECT * FROM teams WHERE club_id='" . $clubId . "'
            ) AS A 
            LEFT JOIN clubs AS B ON A.club_id=B.id 
        ";

        $query .= "LEFT JOIN (" . $playedCntTbl . ") AS P ON A.id=P.team_id";

        if (sizeof($recordItems)) {
            foreach ($recordItems as $item) {
                $itemId = $item->id;
                $select .= ",P" . $itemId . ".point AS point" . $itemId;
                $query .= " LEFT JOIN (
                    SELECT team_id, SUM(point) AS point 
                    FROM game_records 
                    WHERE item_id=" . $itemId . " 
                    GROUP BY team_id   
                ) AS P" . $itemId . " ON A.id=P" . $itemId . ".team_id";
            }
        }
        $query = $select . $query;
        return $this->db->query($query)->result();
    }

    public function getTeamStats($clubId)
    {
        $CI =& get_instance();
        $CI->load->model('team_model');
        $CI->load->model('record_item_model');

        $result = array();

        $teams = $CI->team_model->getRows($clubId);
        $teamIds = array();
        if (sizeof($teams)) {
            foreach ($teams as $team) {
                $teamIds[] = $team->id;
            }

            $teamIdsStr = implode(',', $teamIds);

            $query = "
                SELECT A.*, B.P_cnt, C.W_cnt, D.D_cnt, E.L_cnt  
                FROM (SELECT * FROM teams WHERE club_id=" . $clubId . ") AS A 
                LEFT JOIN (SELECT team_id, COUNT(id) AS P_cnt FROM game_scores WHERE team_id IN (".$teamIdsStr.") GROUP BY team_id) AS B ON A.id=B.team_id
                LEFT JOIN (SELECT team_id, COUNT(id) AS W_cnt FROM game_scores WHERE team_id IN (".$teamIdsStr.") AND `point` = 3 GROUP BY team_id) AS C ON A.id=C.team_id
                LEFT JOIN (SELECT team_id, COUNT(id) AS D_cnt FROM game_scores WHERE team_id IN (".$teamIdsStr.") AND `point` = 1 GROUP BY team_id) AS D ON A.id=D.team_id
                LEFT JOIN (SELECT team_id, COUNT(id) AS L_cnt FROM game_scores WHERE team_id IN (".$teamIdsStr.") AND `point` = 0 GROUP BY team_id) AS E ON A.id=E.team_id
            ";
            $teams = $this->db->query($query)->result(); // replacing teams array

            $this->db->select('team_id, item_id, SUM(point) as `point`');
            $this->db->from($this->table);
            $this->db->where('team_id IN (' . $teamIdsStr . ')');
            $this->db->group_by('item_id, team_id');
            $rows = $this->db->get()->result();

            $records = array();
            if (sizeof($rows)) {
                foreach ($rows as $row) {
                    if (!isset($records[$row->team_id])) $records[$row->team_id] = array();
                    $records[$row->team_id][$row->item_id] = $row->point;
                }
            }

        }

        $recordItems = $CI->record_item_model->getRows();

        if (sizeof($teams)) {
            foreach ($teams as $team) {
                if (sizeof($recordItems)) {
                    foreach ($recordItems as $recordItem) {
                        if (isset($records[$team->id][$recordItem->id])) {
                            $point = 'point' . $recordItem->id;
                            $team->$point = $records[$team->id][$recordItem->id];
                        }
                    }
                }
                $result[] = $team;
            }
        }
        return $result;
    }

    public function getPlayerStats($teamId)
    {
        $CI =& get_instance();
        $CI->load->model('player_model');
        $CI->load->model('record_item_model');

        $this->db->select('player_id, item_id, SUM(point) as `point`');
        $this->db->from($this->table);
        $this->db->where('team_id=' . $teamId);
        $this->db->group_by('item_id, player_id');
        $rows = $this->db->get()->result();

        $records = array();
        if (sizeof($rows)) {
            foreach ($rows as $row) {
                if (!isset($records[$row->player_id])) $records[$row->player_id] = array();
                $records[$row->player_id][$row->item_id] = $row->point;
            }
        }

        $players = $CI->player_model->getPlayersWithPerson($teamId);
        $recordItems = $CI->record_item_model->getRows();

        $result = array();
        if (sizeof($players)) {
            foreach ($players as $player) {
                if (sizeof($recordItems)) {
                    foreach ($recordItems as $recordItem) {
                        if (isset($records[$player->id][$recordItem->id])) {
                            $point = 'point' . $recordItem->id;
                            $player->$point = $records[$player->id][$recordItem->id];
                        }
                    }
                }
                $result[] = $player;
            }
        }
        return $result;
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('game_id', 'team_id', 'player_id', 'item_id', 'point', 'record_time', 'reason');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        if ($rowId) {
            $this->db->where('id', $rowId);
            $this->db->update($this->table, $row);
        } else {
            $this->db->insert($this->table, $row);
            $rowId = $this->db->insert_id();
        }

        // saving scores.
        $CI =& get_instance();
        $CI->load->model('game_score_model');
        $CI->game_score_model->saveTeamScores($data['game_id']);

        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}