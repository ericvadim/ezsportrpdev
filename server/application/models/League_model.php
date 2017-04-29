<?php


class League_model extends CI_Model
{
    private $table = 'leagues';

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

    public function getLeaguesWithCompetitions()
    {
        $this->db->select('A.*, B.competition_name');
        $this->db->from($this->table . ' as A');
        $this->db->join('competitions as B', 'A.competition_id = B.id');
        return $this->db->get()->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('competition_id', 'season', 'group_level', 'start_date', 'status', 'applied_date', 'accepted_flag', 'paid_flag', 'roster');
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