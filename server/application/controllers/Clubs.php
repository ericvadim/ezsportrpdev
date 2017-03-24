<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Clubs extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('club_model');

        $rows = $this->club_model->getClubs();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('club_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->club_model->saveClub($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('club_model');
        $result = $this->club_model->deleteClub($data['id']);
        exit($result);
    }
}
