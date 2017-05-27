<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Sports extends Base_Controller
{
    public $roles = [];

    function __construct()
    {
        parent::__construct();
        $this->load->model('sport_model');
    }

    public function index_get()
    {
        if (!$this->protect([1])) return;
        $rows = $this->sport_model->getRows();
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->sport_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->sport_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
