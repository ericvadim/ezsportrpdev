<?php


class Team_model extends CI_Model
{
    private $table = 'teams';
    private $imagePath = 'uploads/team_images/';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows($clubId)
    {
        $rows = $this->db->get_where($this->table, array('club_id' => $clubId))->result();
        if (sizeof($rows)) {
            foreach ($rows as $key => $value) {
                $image = base_url() . $this->imagePath . $value->id . '.jpg';
                $value->image = file_exists($image) ? base_url() . $image : './styles/img/no.jpg';
            }
        }
        return $rows;
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('club_id', 'sport_id', 'team_name');
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
                file_put_contents('uploads/team_images/' . $rowId . '.jpg', base64_decode($img));
            }
        }

        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        $file = base_url() . $this->imagePath . $rowId . '.jpg';
        if (file_exists($file)) unlink($file);
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}