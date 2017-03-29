<?php


class League_model extends CI_Model
{

    private $table = 'leagues';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getLeagues()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveLeague($data)
    {

        $rowId = $data['id'];

        $cols = array('competition_id', 'season', 'start_date', 'status', 'applied_date', 'accepted_flag', 'paid_flag', 'roster');
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

    public function deleteLeague($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}