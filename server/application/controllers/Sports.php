<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sports extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('sport_model');

        $rows = $this->sport_model->getSports();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('sport_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->sport_model->saveSport($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('sport_model');
        $result = $this->sport_model->deleteSport($data['id']);
        exit($result);
    }
}
