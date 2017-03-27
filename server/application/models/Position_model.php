<?php


class Position_model extends CI_Model
{

    private $table = 'positions';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getPositions($sportId)
    {
        if ($sportId) {
            $result = $this->db->get_where($this->table, array('sport_id'=>$sportId))->result();
        } else {
            $result = $this->db->get($this->table)->result();
        }
        return $result;
    }

    public function savePosition($data)
    {

        $rowId = $data['id'];

        $cols = array('sport_id', 'position_name', 'short_name');
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

    public function deletePosition($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}