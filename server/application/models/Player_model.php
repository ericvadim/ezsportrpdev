<?php


class Player_model extends CI_Model
{

    private $table = 'players';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getRows($teamId)
    {
         return $this->db->get_where($this->table, array('team_id' => $teamId))->result();
    }

    public function saveRow($data)
    {

        $rowId = $data['id'];

        $cols = array('team_id', 'person_id', 'identifier', 'player_number', 'position_id');
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

    public function deleteRowById($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }

    public function setInsertData($teamId, $personId, $person){
        $playerData = array(
            'id' => '',
            'team_id' => $teamId,
            'person_id' => $personId,
            'player_number' => $person['H'],
            'identifier' => $person['J'],
            'position_id' => ''
        );
        return $this->saveRow($playerData);     // saving a player.
    }

    public function getFields()
    {
        $fields = array(
            array('tbl' => 'person', 'field' => 'first_name', 'xls' => 'First'),
            array('tbl' => 'person', 'field' => 'last_name', 'xls' => 'Last'),
            array('tbl' => 'person', 'field' => 'address', 'xls' => 'Address'),
            array('tbl' => 'person', 'field' => 'city', 'xls' => 'City'),
            array('tbl' => 'person', 'field' => 'state', 'xls' => 'State'),
            array('tbl' => 'person', 'field' => 'zipcode', 'xls' => 'Zip'),
            array('tbl' => 'person', 'field' => 'birthday', 'xls' => 'Birthdate'),
            array('tbl' => 'player', 'field' => 'player_number', 'xls' => 'Jersey Number'),
            array('tbl' => 'person', 'field' => '', 'xls' => 'Position'),
            array('tbl' => 'player', 'field' => 'identifier', 'xls' => 'Player ID '),
            array('tbl' => 'person', 'field' => 'email', 'xls' => 'Email'),
            array('tbl' => 'person', 'field' => 'cell_phone', 'xls' => 'Phone Number'),
            array('tbl' => 'person', 'field' => 'gender', 'xls' => 'Gender'),
            array('tbl' => 'person', 'field' => 'contact_name', 'xls' => 'Contact 1 Name'),
            array('tbl' => 'person', 'field' => 'contact_phone', 'xls' => 'Contact 1 Phone'),
            array('tbl' => 'person', 'field' => 'contact_email', 'xls' => 'Contact 1 Email'),
            array('tbl' => 'person', 'field' => '', 'xls' => 'Contact 1 Address'),
            array('tbl' => 'person', 'field' => '', 'xls' => 'Contact 2 Name'),
            array('tbl' => 'person', 'field' => '', 'xls' => 'Contact 2 Phone'),
            array('tbl' => 'person', 'field' => '', 'xls' => 'Contact 2 Email'),
            array('tbl' => 'person', 'field' => '', 'xls' => 'Contact 2 Address'),
        );
        return $fields;
    }
}