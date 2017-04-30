<?php


class Club_admin_model extends CI_Model
{

    private $table = 'club_admins';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getClubAdmins($clubId)
    {
        return $this->db->get_where($this->table, array('club_id' => $clubId))->result();
    }

    public function saveClubAdmin($data)
    {
        $rowId = $data['id'];

        $cols = array('club_id', 'person_id');
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

    public function deleteClubAdmin($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }

    public function setInsertData($clubId, $personId, $person){
        $clubAdminData = array(
            'id' => '',
            'club_id' => $clubId,
            'person_id' => $personId
        );
        var_dump($clubAdminData);
        $result = $this->saveClubAdmin($clubAdminData);     // saving a referee.
        return;
    }

    public function getFields()
    {

        $fields = array(
            array('tbl' => 'person', 'field' => 'first_name', 'xls' => 'First Name'),
            array('tbl' => 'person', 'field' => 'last_name', 'xls' => 'Last  Name'),
            array('tbl' => 'clubadmin', 'field' => '', 'xls' => 'Title'),
            array('tbl' => 'person', 'field' => 'cell_phone', 'xls' => 'Phone Number'),
            array('tbl' => 'person', 'field' => 'email', 'xls' => 'Email'),
            array('tbl' => 'person', 'field' => 'address', 'xls' => 'Address'),
            array('tbl' => 'person', 'field' => 'city', 'xls' => 'City'),
            array('tbl' => 'person', 'field' => 'state', 'xls' => 'State'),
            array('tbl' => 'person', 'field' => 'zipcode', 'xls' => 'Zip Code')
        );
        return $fields;
    }

}