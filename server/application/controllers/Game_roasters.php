<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Game_roasters extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('game_roaster_model');
    }

    public function index_get()
    {
//        if (!$this->protect()) return;
        $this->load->model('player_model');
        $teamId = $this->input->get('team_id');
        $rows = $this->player_model->getPlayers($teamId);

        $gameId = $this->input->get('game_id');
        $rows = $this->game_roaster_model->getRows($teamId, $gameId);


        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->game_roaster_model->saveRow($data);
        $this->set_response($result, 200);
    }
}
