<?php


class Game_schedule_model extends CI_Model
{

    private $table = 'game_schedules';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getGames()
    {
        return $this->db->get($this->table)->result();
    }

    public function getGameSchedules()
    {
        $this->db->select('A.*, B.team_name as home_team_name, B.id as home_team_id, C.team_name as away_team_name, C.id as away_team_id, E.competition_name as league_name');
        $this->db->from($this->table . ' as A');
        $this->db->join('teams as B', 'A.home_team_id=B.id');
        $this->db->join('teams as C', 'A.away_team_id=C.id');
        $this->db->join('leagues as D', 'A.league_id=D.id');
        $this->db->join('competitions as E', 'D.competition_id=E.id');
        return $this->db->get()->result();
    }

    public function saveGame($data)
    {

        $rowId = $data['id'];

        $cols = array('league_id', 'home_team_id', 'away_team_id', 'game_date', 'start_time', 'arrival_time', 'duration', 'field_id', 'uniform');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        if ($rowId) {
            $this->db->where('id', $rowId);
            $result = $this->db->update($this->table, $row);
        } else {
            $result = $this->db->insert($this->table, $row);
            $this->db->insert_id();
        }

        return $result;
    }

    public function deleteGame($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}