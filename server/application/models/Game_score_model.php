<?php


class Game_score_model extends CI_Model
{
    private $table = 'game_scores';

    function __construct()
    {
        parent::__construct();
    }

    public function saveTeamScores($gameId)
    {
        $CI =& get_instance();
        $CI->load->model('game_schedule_model');
        $schedule = $CI->game_schedule_model->getRowById($gameId);

        $this->deleteRowsByGame($gameId);

        $homeRecord = $this->db->query("select COUNT(id) AS goal FROM game_records WHERE game_id=" . $gameId . " AND team_id=" . $schedule->home_team_id . " AND item_id=1 GROUP BY game_id, team_id")->row();
        $awayRecord = $this->db->query("select COUNT(id) AS goal FROM game_records WHERE game_id=" . $gameId . " AND team_id=" . $schedule->away_team_id . " AND item_id=1 GROUP BY game_id, team_id")->row();

        $homeGoal = isset($homeRecord->goal) ? $homeRecord->goal : 0;
        $awayGoal = isset($awayRecord->goal) ? $awayRecord->goal : 0;

        if ($homeGoal * 1 > $awayGoal * 1) {
            $homePoint = 3;
            $awayPoint = 0;
        } else if ($homeGoal * 1 < $awayGoal * 1) {
            $homePoint = 0;
            $awayPoint = 3;
        } else if ($homeGoal * 1 == $awayGoal * 1) {
            $homePoint = 1;
            $awayPoint = 1;
        }

        $this->db->insert($this->table, array('game_id' => $gameId, 'team_id' => $schedule->home_team_id, 'goal' => $homeGoal, 'point' => $homePoint));
        $this->db->insert($this->table, array('game_id' => $gameId, 'team_id' => $schedule->away_team_id, 'goal' => $awayGoal, 'point' => $awayPoint));

        return true;
    }

    public function deleteRowsByGame($gameId)
    {
        return $this->db->delete($this->table, array('game_id' => $gameId));
    }
}