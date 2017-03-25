<?php


class Player_model extends CI_Model
{

    private $table = 'players';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getPlayers($teamId)
    {
        return $this->db->get_where($this->table, array('team_id' => $teamId))->result();
    }

    public function savePlayer($data)
    {

        $rowId = $data['id'];

        $cols = array('team_id', 'first_name', 'last_name', 'player_number', 'position', 'birthday', 'player_email', 'player_cell', 'emergency_cont_num', 'emergency_cont_name');
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

    public function deletePlayer($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}