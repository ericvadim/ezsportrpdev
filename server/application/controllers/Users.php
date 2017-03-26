<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('user_model');

        $rows = $this->user_model->getUsers();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('user_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->user_model->saveUser($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('user_model');
        $result = $this->user_model->deleteUser($data['id']);
        exit($result);
    }
}
