<?php


class Person_model extends CI_Model
{

    private $table = 'persons';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getRows($division = 1)
    {
        $where = "";
        switch ($division) {
            case 1:
                $where .= "1";
                break;
            case 2:
                $where .= "id IN (SELECT person_id FROM players GROUP BY person_id)";
                break;
            case 3:
                $where .= "id IN (SELECT person_id FROM coaches GROUP BY person_id)";
                break;
            case 4:
                $where .= "id IN (SELECT person_id FROM managers GROUP BY person_id)";
                break;
            case 5:
                $where .= "id IN (SELECT person_id FROM referees GROUP BY person_id)";
                break;
            case 6:
                $personRegisteredTbl = "
                SELECT * FROM (
                    (SELECT person_id FROM players) 
                    UNION (SELECT person_id FROM coaches)  
                    UNION (SELECT person_id FROM referees)
                ) AS A GROUP BY person_id
                ";
                $where .= "id NOT IN (" . $personRegisteredTbl . ")";
                break;
            default:
        }

        $query = "
            SELECT * 
            FROM ".$this->table." 
            WHERE " . $where . " 
        ";
        $result = $this->db->query($query);
        return $result->result_array($result);
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {

        $rowId = $data['id'];

        $cols = array('first_name', 'last_name', 'short_name', 'birthday', 'city', 'state', 'zipcode', 'gender', 'address', 'email', 'home_phone', 'cell_phone', 'contact_name', 'contact_email', 'contact_phone');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        if ($rowId) {
            $this->db->where('id', $rowId);
            $result = $this->db->update($this->table, $row);
        } else {
            $result = $this->db->insert($this->table, $row);
            $rowId = $this->db->insert_id();
        }

        if (isset($data['image'])) {
            if (strpos($data['image'], 'base64')) {
                list(, $img) = explode(',', $data['image']);
                file_put_contents('uploads/persons/' . $rowId . '.jpg', base64_decode($img));
            }
        }
        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        if (file_exists('uploads/persons/' . $rowId . '.jpg')) unlink('uploads/persons/' . $rowId . '.jpg');
        return $this->db->delete($this->table, array('id' => $rowId));
    }

    public function getInFields($xls_fileds){
        $person_fields = $this->fields();
        $fieldsAry = array();
        $ind = 0; $alphabet = range('A', 'Z');
        foreach($xls_fileds as $row){
            if($row['tbl'] == 'person' && $row['field'] != ''){
                if(in_array($row['field'], $person_fields)){
                    $fieldsAry[$alphabet[$ind]] = $row['field'];
                }
            }
            $ind++;
        }
        return $fieldsAry;
    }

    public function getPersonByCondition($dataAry){
        $where = '1 ';
        foreach($dataAry as $key=>$val){
            if($val == '') continue;
            if($key == 'birthday') {
                $dt = convertDate($val);
                if($dt == '') continue;
                $where .= " AND " . $key . "= '" . $dt . "'";
            } else {
                $where .= " AND LOWER(TRIM(" . $key . "))= LOWER(TRIM('" . $val . "'))";
            }
        }

        $query = "SELECT * FROM ". $this->table ." WHERE " . $where ;
        //print_r($query);
        $result = $this->db->query($query);
        return $result->row_array();
    }

    public function getSubRelationByPerson($person_id, $sub_id, $page_id){
        if($page_id == 'player'){
            $sub_table = 'players';
            $sub_field = 'team_id';
        } else if($page_id == 'coache'){
            $sub_table = 'coaches';
            $sub_field = 'team_id';
        } else if($page_id == 'manager'){
            $sub_table = 'managers';
            $sub_field = 'team_id';
        } else if($page_id == 'referee'){
            $sub_table = 'referees';
            $sub_field = 'club_id';
        } else if($page_id == 'clubadmin'){
            $sub_table = 'club_admins';
            $sub_field = 'club_id';
        }


        $sql = "SELECT * FROM `". $sub_table ."` WHERE `".$sub_field."`='".$sub_id."' AND `person_id`='".$person_id."'";
        $query = $this->db->query($sql);
        return $query->row_array();
    }

    private function fields(){
        $sql = "SHOW COLUMNS FROM " . $this->table;
        $query = $this->db->query($sql);

        if($query->num_rows() < 1) return null;

        $rows = $query->result_array();
        $fields = array_column($rows, 'Field');
        return $fields;
    }
}