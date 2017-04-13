<?php


class Person_model extends CI_Model
{

    private $table = 'persons';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getPersons($division)
    {
        $where = '';
        switch($division) {
            case 1:
                $where .= '1';
                break;
            case 2:
                $where .= 'id IN (SELECT person_id FROM players GROUP BY person_id)';
                break;
            case 3:
                $where .= 'id IN (SELECT person_id FROM players GROUP BY person_id)';
                break;
            case 4:
                $where .= 'id IN (SELECT person_id FROM players GROUP BY person_id)';
                break;
            case 5:
                $where .= 'id IN (SELECT person_id FROM players GROUP BY person_id)';
                break;
            case 6:
                $where .= 'id IN (SELECT person_id FROM players GROUP BY person_id)';
                break;
            default:
        }

        $query = '
            SELECT * 
            FROM persons 
            WHERE ' . $where . ' 
        ';
        $result = $this->db->query($query);
        return $result->result_array($result);
    }

    public function savePerson($data)
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
                file_put_contents('uploads/persons/' . $rowId .'.jpg', base64_decode($img));
            }
        }
        return $rowId;
    }

    public function deletePerson($rowId)
    {
        unlink('uploads/persons/' . $rowId .'.jpg');
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}