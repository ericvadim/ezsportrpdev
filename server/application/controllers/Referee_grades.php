<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Referee_grades extends Base_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('referee_grade_model');
    }

    public function index_get()
    {
//        if (!$this->protect()) return;
        $rows = $this->referee_grade_model->getRows();
        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->referee_grade_model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $data = $this->input->get();
        $result = $this->referee_grade_model->deleteRowById($data['id']);
        $this->set_response($result, 200);
    }
}
