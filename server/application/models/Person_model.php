<?php


class Person_model extends CI_Model
{

    private $table = 'persons';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getPersons()
    {
        return $this->db->get($this->table)->result();
    }

    public function savePerson($data)
    {

        $rowId = $data['id'];

        $cols = array('first_name', 'last_name', 'short_name', 'birthday', 'gender', 'address', 'email', 'home_phone', 'cell_phone', 'contact_name', 'contact_email', 'contact_phone');
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

        if (isset($data['image'])) {
            if (strpos($data['image'], 'base64')) {
                list(, $img) = explode(',', $data['image']);
                file_put_contents('uploads/persons/' . $rowId .'.jpg', base64_decode($img));
            }
        }
        return $result;
    }

    public function deletePerson($rowId)
    {
        unlink('uploads/persons/' . $rowId .'.jpg');
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}