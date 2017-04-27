<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Competitions extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('competition_model');
    }

    public function index_get()
    {
//        if (!$this->protect()) return;
        $rows = $this->competition_model->getRows();
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->competition_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->competition_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
