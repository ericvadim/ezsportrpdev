<?php


class Field_model extends CI_Model
{

    private $table = 'fields';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getFields()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveField($data)
    {

        $rowId = $data['id'];

        $cols = array('field_name', 'soccer', 'synthetic_turf', 'restrooms', 'location');
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

    public function deleteField($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}