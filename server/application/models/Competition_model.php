<?php


class Competition_model extends CI_Model
{

    private $table = 'competitions';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getCompetitions()
    {
        $rows = $this->db->get($this->table)->result();
        $result = array();
        if (sizeof($rows)) {
            foreach ($rows as $key => $val) {
                $result[$key] = $val;
                $ary = array();
                $groupLevels = explode(',', substr($result[$key]->group_levels, 1, strlen($result[$key]->group_levels) - 2));
                if (sizeof($groupLevels)) {
                    foreach ($groupLevels as $k => $v) {
                        $ary[$v] = true;
                    }
                }
                $result[$key]->group_levels = $ary;
            }
        }
        return $result;
    }

    public function saveCompetition($data)
    {
        $rowId = $data['id'];

        $cols = array('competition_name');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        $row['group_levels'] = '';
        if (sizeof($data['group_levels'])) {
            foreach ($data['group_levels'] as $key => $val) {
                if ($key) {
                    if ($val) $row['group_levels'] .= ',' . $key;
                }
            }
            $row['group_levels'] .= ',';
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

    public function deleteCompetition($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}