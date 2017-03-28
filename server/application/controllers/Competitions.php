<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Competitions extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('competition_model');

        $rows = $this->competition_model->getCompetitions();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('competition_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->competition_model->saveCompetition($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('competition_model');
        $result = $this->competition_model->deleteCompetition($data['id']);
        exit($result);
    }
}
