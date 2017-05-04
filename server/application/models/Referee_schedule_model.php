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
        $select = "A.*";
        $select .= ", B.club_id";
        $select .= ", CONCAT_WS(' ', C.first_name, C.last_name) AS referee_name";
        $select .= ", D.league_id, D.game_name, D.game_date, D.start_time, D.duration";
        $select .= ", F.competition_name";
        $select .= ", G.field_name";
        $select .= ", H.age_group";

        $this->db->select($select);
        $this->db->from($this->table . ' as A');
        $this->db->join('referees as B', 'B.id = A.referee_id', 'left outer');
        $this->db->join('persons as C', 'C.id = B.person_id', 'left outer');
        $this->db->join('game_schedules as D', 'D.id = A.game_id', 'left outer');
        $this->db->join('leagues as E', 'E.id = D.league_id', 'left outer');
        $this->db->join('competitions as F', 'F.id = E.competition_id', 'left outer');
        $this->db->join('fields as G', 'G.id = D.field_id', 'left outer');
        $this->db->join('teams as H', 'H.id = D.home_team_id', 'left outer');
        $this->db->order_by('D.id');
        return $this->db->get()->result();
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('game_id', 'referee_id', 'status');
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