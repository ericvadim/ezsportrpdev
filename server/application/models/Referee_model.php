<?php


class Referee_model extends CI_Model
{

    private $table = 'referees';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getReferees($clubId)
    {
        return $this->db->get_where($this->table, array('club_id' => $clubId))->result();
    }

    public function saveReferee($data)
    {
        $rowId = $data['id'];

        $cols = array('club_id', 'person_id', 'grade');
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

    public function deleteReferee($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }

    public function setInsertData($clubId, $personId, $person){
        $refereeData = array(
            'id' => '',
            'club_id' => $clubId,
            'person_id' => $personId,
            'grade' => $person['J']
        );
        $result = $this->saveReferee($refereeData);     // saving a referee.
        return;
    }

    public function getFields()
    {

        $fields = array(
            array('tbl' => 'person', 'field' => 'first_name', 'xls' => 'First Name'),
            array('tbl' => 'person', 'field' => 'last_name', 'xls' => 'last  Name'),
            array('tbl' => 'person', 'field' => 'home_phone', 'xls' => 'Home Phone'),
            array('tbl' => 'person', 'field' => 'cell_phone', 'xls' => 'Cell Number'),
            array('tbl' => 'person', 'field' => 'email', 'xls' => 'Email'),
            array('tbl' => 'person', 'field' => 'address', 'xls' => 'Address'),
            array('tbl' => 'person', 'field' => 'city', 'xls' => 'City'),
            array('tbl' => 'person', 'field' => 'state', 'xls' => 'State'),
            array('tbl' => 'person', 'field' => 'zipcode', 'xls' => 'Zip Code'),
            array('tbl' => 'referee', 'field' => '', 'xls' => 'Referee Grade'),
            array('tbl' => 'referee', 'field' => '', 'xls' => 'Date of Licence'),
            array('tbl' => 'referee', 'field' => '', 'xls' => 'License Number')
        );
        return $fields;
    }
}

