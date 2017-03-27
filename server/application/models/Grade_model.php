<?php


class Grade_model extends CI_Model
{

    private $table = 'grades';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getGrades()
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

    public function saveGrade($data)
    {
        $rowId = $data['id'];

        $cols = array('grade_identifier', 'grade_name');
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
            $result = $this->db->update($this->table, $row);
        } else {
            $result = $this->db->insert($this->table, $row);
            $this->db->insert_id();
        }

        return $result;
    }

    public function deleteGrade($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}