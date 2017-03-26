<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Managers extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('manager_model');
        $clubId = $this->input->get('club_id');

        $rows = $this->manager_model->getManagers($clubId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('manager_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->manager_model->saveManager($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('manager_model');
        $result = $this->manager_model->deleteManager($data['id']);
        exit($result);
    }
}
