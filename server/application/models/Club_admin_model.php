<?php


class Club_admin_model extends CI_Model
{

    private $table = 'club_admins';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getClubAdmins($clubId)
    {
        return $this->db->get_where($this->table, array('club_id' => $clubId))->result();
    }

    public function saveClubAdmin($data)
    {
        $rowId = $data['id'];

        $cols = array('club_id', 'person_id');
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

    public function deleteClubAdmin($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}