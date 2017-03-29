<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Leagues extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('league_model');

        $rows = $this->league_model->getLeagues();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('league_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->league_model->saveLeague($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('league_model');
        $result = $this->league_model->deleteLeague($data['id']);
        exit($result);
    }
}
