<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Game_schedules extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('game_schedule_model');
    }

    public function index_get()
    {
//        if (!$this->protect()) return;
        $leagueId = $this->input->get('league_id');
        $rows = $this->game_schedule_model->getRows($leagueId);
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->game_schedule_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->game_schedule_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
