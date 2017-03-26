<?php


class Manager_model extends CI_Model
{

    private $table = 'managers';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getManagers($clubId)
    {
        return $this->db->get_where($this->table, array('club_id' => $clubId))->result();
    }

    public function saveManager($data)
    {

        $rowId = $data['id'];

        $cols = array('club_id', 'first_name', 'last_name', 'short_name', 'email', 'phone_cell', 'phone_home');
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

    public function deleteManager($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}