<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Teams extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('team_model');
    }

    public function index_get()
    {
//        if (!$this->protect()) return;
        $clubId = $this->input->get('club_id');
        $rows = $this->team_model->getRows($clubId);
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->team_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->team_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
