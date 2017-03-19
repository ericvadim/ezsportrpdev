<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Referees extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('referee_model');

        $rows = $this->referee_model->getGrades();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('referee_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->referee_model->saveGrade($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('referee_model');
        $result = $this->referee_model->deleteGrade($data['id']);
        exit($result);
    }
}
