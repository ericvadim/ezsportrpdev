<?php


class Game_record_model extends CI_Model
{
    private $table = 'game_records';

    function __construct()
    {
        parent::__construct();
    }

    public function getRows($gameId)
    {
        $query = "
            SELECT A.*, B.team_name, C.player_number, D.first_name, D.last_name, E.position_name 
            FROM (
              SELECT * FROM " . $this->table . " WHERE game_id=" . $gameId . "
            ) AS A  
            LEFT JOIN teams AS B ON B.id = A.team_id 
            LEFT JOIN players AS C ON C.id=A.player_id 
            LEFT JOIN persons AS D ON D.id=C.person_id 
            LEFT JOIN positions AS E ON E.id=C.position_id 
            ORDER BY D.first_name, D.last_name 
        ";
        return $this->db->query($query)->result();
    }

    public function getPlayerStats()
    {
        $CI =& get_instance();
        $CI->load->model('record_item_model');
        $recordItems = $CI->record_item_model->getRows();

        $select = "SELECT A.id, CONCAT_WS(' ', B.first_name, B.last_name) AS player_name";

        $query = "
            FROM players AS A 
            LEFT JOIN persons AS B ON A.person_id=B.id 
        ";

        if (sizeof($recordItems)) {
            foreach ($recordItems as $item) {
                $itemId = $item->id;
                $select .= ",P" . $itemId . ".point AS point" . $item->id;
                $query .= " LEFT JOIN (
                    SELECT player_id, SUM(point) AS point 
                    FROM game_records 
                    WHERE item_id=" . $itemId . " 
                    GROUP BY player_id   
                ) AS P" . $itemId . " ON A.id=P" . $itemId . ".player_id";
            }
        }

        $query = $select . $query;

        return $this->db->query($query)->result();
    }

    public function getRowById($id)
    {
        return $this->db->get_where($this->table, array('id' => $id))->result();
    }

    public function saveRow($data)
    {
        $rowId = $data['id'];

        $cols = array('game_id', 'team_id', 'player_id', 'item_id', 'point', 'record_time', 'reason');
        $row = array();
        foreach ($cols as $col) {
            $row[$col] = isset($data[$col]) ? $data[$col] : '';
        }

        if ($rowId) {
            $this->db->where('id', $rowId);
            $this->db->update($this->table, $row);
        } else {
            $this->db->insert($this->table, $row);
            $rowId = $this->db->insert_id();
        }
        return $rowId;
    }

    public function deleteRowById($rowId)
    {
        return $this->db->delete($this->table, array('id' => $rowId));
    }
}