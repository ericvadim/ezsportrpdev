<?php


class Referee_schedule_model extends CI_Model
{
    private $table = 'referee_schedules';

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

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('game_id', 'referee_id', 'state');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        if ($rowId) {
            $this->db->where('id', $rowId);
            $this->db->update($this->table, $row);
        } else {
            $this->db->insert($this->table, $row);
            $rowId = $this->db->insert_id();
        }
        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}