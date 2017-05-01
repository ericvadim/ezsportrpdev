<?php


class Game_roaster_model extends CI_Model
{
    private $table = 'game_roasters';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows($teamId, $gameId)
    {
        $query = "
            SELECT C.id, A.id AS player_id, A.player_number, B.first_name, B.last_name, C.is_captain, C.is_starter, D.short_name AS position_name
            FROM (
              SELECT * FROM players WHERE team_id=" . $teamId . "
            ) AS A  
            LEFT OUTER JOIN persons AS B ON B.id = A.person_id 
            LEFT OUTER JOIN (
              SELECT * FROM " . $this->table . " WHERE team_id=" . $teamId . " AND game_id=" . $gameId . "
            ) AS C ON C.player_id = A.id 
            LEFT OUTER JOIN positions AS D ON A.position_id=D.id
        ";
        return $this->db->query($query)->result();
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        if ($data['is_captain']) {
            $this->db->update($this->table, array('is_captain' => '0'), array('team_id' => $data['team_id'], 'game_id' => $data['game_id'], 'is_captain' => '1'));
        }

        $cols = array('team_id', 'game_id', 'player_id', 'is_captain', 'is_starter');
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
        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}