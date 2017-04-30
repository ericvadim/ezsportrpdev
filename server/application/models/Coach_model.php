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


    public function setInsertData($teamId, $personId, $person){
        $coachData = array(
            'id' => '',
            'team_id' => $teamId,
            'person_id' => $personId,
            'coach_type' => $person['J']
        );

        $result = $this->saveCoach($coachData);     // saving a player.
        return;
    }

    public function getFields()
    {
        $fields = array(
            array('tbl' => 'person', 'field' => 'first_name', 'xls' => 'Coach First Name'),
            array('tbl' => 'person', 'field' => 'last_name', 'xls' => 'Coach Last Name'),
            array('tbl' => 'person', 'field' => 'cell_phone', 'xls' => 'Cell Number'),
            array('tbl' => 'person', 'field' => 'home_phone', 'xls' => 'Phone Number'),
            array('tbl' => 'person', 'field' => 'email', 'xls' => 'Email'),
            array('tbl' => 'person', 'field' => 'address', 'xls' => 'Address'),
            array('tbl' => 'person', 'field' => 'city', 'xls' => 'City'),
            array('tbl' => 'person', 'field' => 'zipcode', 'xls' => 'Zip Code'),
            array('tbl' => 'coaches', 'field' => '', 'xls' => 'COACHING LEVEL LICENSE'),
            array('tbl' => 'coaches', 'field' => '', 'xls' => 'Other License'),
            array('tbl' => 'coaches', 'field' => '', 'xls' => 'Team - A'),
            array('tbl' => 'coaches', 'field' => '', 'xls' => 'Team B')
        );
        return $fields;
    }
}