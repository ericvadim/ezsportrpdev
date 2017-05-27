<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Positions extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('position_model');
    }

    public function index_get()
    {
        if (!$this->protect([1])) return;
        $sportId = $this->input->get('sport_id');
        $rows = $this->position_model->getRows($sportId);
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->position_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->position_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
