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
        $clubId = $this->input->get('club_id');
        $rows = $this->referee_model->getReferees($clubId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('referee_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->referee_model->saveReferee($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('referee_model');
        $result = $this->referee_model->deleteReferee($data['id']);
        exit($result);
    }
}
