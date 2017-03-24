<?php


class License_model extends CI_Model
{

    private $table = 'licenses';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getLicenses()
    {
        return $this->db->get($this->table)->result();
    }

    public function saveLicense($data)
    {

        $rowId = $data['id'];

        $cols = array('level', 'license_name');
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

    public function deleteLicense($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}