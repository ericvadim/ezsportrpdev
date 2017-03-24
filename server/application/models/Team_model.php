<?php


class Team_model extends CI_Model
{

    private $table = 'teams';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getTeams()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveTeam($data)
    {

        $rowId = $data['id'];

        $cols = array('club_id', 'team_name');
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
                file_put_contents('uploads/team_images/' . $rowId .'.jpg', base64_decode($img));
            }
        }
        return $result;
    }

    public function deleteTeam($rowId)
    {
        unlink('uploads/categories/' . $rowId .'.jpg');
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}