<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Sports extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('sport_model');
    }

    public function index_get()
    {
//        if (!$this->protect()) return;
        $rows = $this->sport_model->getSports();
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $this->load->model('sport_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->sport_model->saveSport($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();

        $this->load->model('sport_model');
        $result = $this->sport_model->deleteSport($data['id']);
        exit($result);
    }
}
