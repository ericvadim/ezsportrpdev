<?php


class Game_record_model extends CI_Model
{

    private $table = 'game_records';

    function __construct()
    {
        /* Call the Model constructor */
        parent::__construct();
    }

    public function getGameRecords($gameId)
    {
        return $this->db->get_where($this->table, array('game_id'=>$gameId))->result();
    }

    public function saveGameRecord($data)
    {

        $rowId = $data['id'];

        $cols = array('game_id', 'team_id', 'player_id', 'item_id', 'record_time');
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

    public function deleteGameRecord($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}