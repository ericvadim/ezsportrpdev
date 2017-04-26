<?php


class Sport_model extends CI_Model
{

    private $table = 'sports';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows()
    {
        return $this->db->get($this->table)->result();
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function save($data)
    {

        $rowId = $data['id'];

        $cols = array('sport_name');
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

    public function delete($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}