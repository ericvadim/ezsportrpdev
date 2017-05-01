<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Players extends Base_Controller
{
    private $model = null;
    function __construct()
    {
        parent::__construct();
        $this->load->model('player_model');
        $this->model = $this->player_model;
    }

    public function index_get()
    {

        $teamId = $this->input->get('team_id');

        $rows = $this->model->getRows($teamId);

        $this->set_response($rows, 200);
    }

    public function playersWithPerson_get()
    {

        $teamId = $this->input->get('team_id');

        $rows = $this->model->getPlayersWithPerson($teamId);

        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $id = $this->input->get('id');

        $result = $this->model->deleteRowById($id);
        $this->set_response($result, 200);
    }
}
