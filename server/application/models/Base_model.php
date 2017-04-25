<?php

class Base_model extends CI_Model
{

    protected $_table = null;
    protected $_primaryCol = null;
    protected $_foundRows = array();

    /**
     * find multiple rows
     *
     * @param array $options
     *                  select => comma separated column names
     *                  where => where clause
     * @return Object[]
     */
    public function findAll($options = array())
    {
        $this->db->select(empty($options['select']) ? '*' : $options['select']);
        $this->db->where(empty($options['where']) ? '1' : $options['where']);
        $this->db->from($this->_table);
        return $this->db->get()->result();
    }

    /**
     * @param $id - primary value
     * @return Object[]
     */
    public function findRowById($id, $cache = true)
    {
        if ($cache && isset($this->_foundRows[$id])) {
            return $this->_foundRows[$id];
        }
        $this->db->where($this->_primaryCol, $id);
        $row = $this->db->get($this->_table)->row();
        if ($cache) {
            $this->_foundRows[$id] = $row;
        }
        return $row;
    }

    public function insert($data, $trackDate = false)
    {
        if ($trackDate) {
            $data['createdOn'] = date('Y-m-d H:i:s');
            $data['lastUpdatedOn'] = date('Y-m-d H:i:s');
        }
        if ($this->db->insert($this->_table, $data)) {
            return $this->db->insert_id();
        }
        return null;
    }

    public function update($id, $data, $trackDate = false)
    {
        if ($trackDate) {
            $data['lastUpdatedOn'] = date('Y-m-d H:i:s');
        }
        $this->db->where($this->_primaryCol, $id);
        return $this->db->update($this->_table, $data);
    }

    public function delete($id)
    {
        $this->db->where($this->_primaryCol, $id);
        return $this->db->delete($this->_table);
    }
}
