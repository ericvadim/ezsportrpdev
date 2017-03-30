<?php


class Record_item_model extends CI_Model
{

    private $table = 'record_items';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getRecordItems()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveRecordItem($data)
    {

        $rowId = $data['id'];

        $cols = array('item_name');
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

    public function deleteRecordItem($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}