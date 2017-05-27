<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Licenses extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('license_model');
    }

    public function index_get()
    {
        if (!$this->protect([1])) return;

        $sportId = $this->input->get('sport_id');
        $rows = $this->license_model->getRows($sportId);
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->license_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->license_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
