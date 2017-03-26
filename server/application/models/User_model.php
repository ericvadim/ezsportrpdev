<?php


class User_model extends CI_Model
{

    private $table = 'users';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getUsers()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveUser($data)
    {

        $rowId = $data['id'];

        $cols = array('username', 'password', 'first_name', 'last_name', 'email', 'address', 'home_phone', 'cell_phone', 'user_type', 'user_flag');
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

    public function deleteUser($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}