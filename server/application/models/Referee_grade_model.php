<?php


class Referee_grade_model extends CI_Model
{
    private $table = 'referee_grades';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows()
    {
        $rows = $this->db->get($this->table)->result();
        $result = array();
        if (sizeof($rows)) {
            foreach ($rows as $key => $val) {
                $result[$key] = $val;
                $ary = array();
                $sportTypes = explode(',', substr($result[$key]->sport_types, 1, strlen($result[$key]->sport_types) - 2));
                if (sizeof($sportTypes)) {
                    foreach ($sportTypes as $k => $v) {
                        $ary[$v] = true;
                    }
                }
                $result[$key]->sport_types = $ary;
            }
        }
        return $result;
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('identifier', 'grade_name');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        $row['sport_types'] = '';
        if (sizeof($data['sport_types'])) {
            foreach ($data['sport_types'] as $key => $val) {
                if ($key) {
                    if ($val) $row['sport_types'] .= ',' . $key;
                }
            }
            $row['sport_types'] .= ',';
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