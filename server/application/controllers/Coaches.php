<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Coaches extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $teamId = $this->input->get('team_id');

        $this->load->database();
        $this->load->model('coach_model');

        $rows = $this->coach_model->getCoaches($teamId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('coach_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->coach_model->saveCoach($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('coach_model');
        $result = $this->coach_model->deleteCoach($data['id']);
        exit($result);
    }
}
