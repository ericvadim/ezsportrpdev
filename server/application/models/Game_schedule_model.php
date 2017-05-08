<?php


class Game_schedule_model extends CI_Model
{
    private $table = 'game_schedules';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows($leagueId)
    {
        return $this->db->get_where($this->table, array('league_id' => $leagueId))->result();
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function getSchedulesByTeam($teamId)
    {
        $this->db->select('*');
        $this->db->where('home_team_id', $teamId);
        $this->db->or_where('away_team_id', $teamId);
        return $this->db->get($this->table)->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('league_id', 'game_name', 'home_team_id', 'away_team_id', 'game_date', 'start_time', 'arrival_time', 'duration', 'field_id', 'uniform', 'actived');
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