<?php


class Team_model extends CI_Model
{
    private $table = 'teams';

    function __construct()
    {
        parent::__construct();
    }

    private function getImagePath($rowId)
    {
        return 'uploads/team_images/' . $rowId . '.jpg';
    }

    public function getRows($clubId)
    {
        $rows = $this->db->get_where($this->table, array('club_id' => $clubId))->result();
        if (sizeof($rows)) {
            foreach ($rows as $key => $value) {
                $image = $this->getImagePath($value->id);
                $value->image = file_exists($image) ? base_url($image) : './styles/img/no.jpg';
            }
        }
        return $rows;
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function getTeamsWithClub()
    {
        $this->db->select('A.*, B.club_name');
        $this->db->from($this->table . ' as A');
        $this->db->join('clubs as B', 'A.club_id = B.id');
        return $this->db->get()->result();
    }

    public function getOneTeamWithClub($teamId)
    {
        $this->db->select('A.*, B.club_name');
        $this->db->from($this->table . ' as A');
        $this->db->join('clubs as B', 'A.club_id = B.id');
        $this->db->where('A.id=' . $teamId);
        $result = $this->db->get()->result();
        return sizeof($result) ? $result[0] : NULL;
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('club_id', 'sport_id', 'team_name', 'age_group');
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

        if (isset($data['image'])) {
            if (strpos($data['image'], 'base64')) {
                list(, $img) = explode(',', $data['image']);
                file_put_contents($this->getImagePath($rowId), base64_decode($img));
            }
        }

        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        $image = $this->getImagePath($rowId);
        if (file_exists($image)) unlink($image);
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}