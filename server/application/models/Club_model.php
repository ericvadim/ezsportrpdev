<?php


class Club_model extends CI_Model
{

    private $table = 'clubs';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getClubs()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveClub($data)
    {

        $rowId = $data['id'];

        $cols = array('club_name', 'country', 'state', 'city');
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

    public function deleteClub($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}