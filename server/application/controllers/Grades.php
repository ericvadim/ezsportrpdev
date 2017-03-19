<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Grades extends CI_Controller
{

    public function index()
    {
        exit('restaurants');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('grade_model');

        $rows = $this->grade_model->getGrades();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('grade_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $this->grade_model->saveGrade($data);
        exit;
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('grade_model');
        $this->grade_model->deleteGrade($data['id']);
        exit;
    }
}
