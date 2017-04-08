<?php


class Coach_model extends CI_Model
{

    private $table = 'coaches';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getCoaches($teamId)
    {
        return $this->db->get_where($this->table, array('team_id' => $teamId))->result();
    }

    public function saveCoach($data)
    {

        $rowId = $data['id'];

        $cols = array('team_id', 'person_id', 'license_id', 'coach_type');
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

    public function deleteCoach($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}