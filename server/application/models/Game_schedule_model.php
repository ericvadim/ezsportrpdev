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