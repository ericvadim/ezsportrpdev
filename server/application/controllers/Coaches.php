<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Coaches extends Base_Controller
{

    private $model = null;
    function __construct()
    {
        parent::__construct();
        $this->load->model('coache_model');
        $this->model = $this->coache_model;
    }
    public function get()
    {
        $teamId = $this->input->get('team_id');

        $rows = $this->coach_model->getCoaches($teamId);

        $this->set_response($rows, 200);
    }

    public function playersWithPerson_get()
    {

        $teamId = $this->input->get('team_id');

        $rows = $this->model->getCoachesWithPerson($teamId);

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
