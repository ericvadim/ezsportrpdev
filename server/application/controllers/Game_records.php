<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Game_records extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('game_record_model');
    }

    public function index_get()
    {
        if (!$this->protect([1])) return;

        $gameId = $this->input->get('game_id');
        $rows = $this->game_record_model->getRows($gameId);
        $this->set_response($rows, 200);
    }

    public function team_stats_get()
    {
//        if (!$this->protect()) return;
        $clubId = $this->input->get('club_id');
        $rows = $this->game_record_model->getTeamStats($clubId);
        $this->set_response($rows, 200);
    }

    public function player_stats_get()
    {
//        if (!$this->protect()) return;
        $teamId = $this->input->get('team_id');
        $rows = $this->game_record_model->getPlayerStats($teamId);
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->game_record_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->game_record_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
