<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Licenses extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('license_model');

        $rows = $this->license_model->getLicenses();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('license_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->license_model->saveLicense($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('license_model');
        $result = $this->license_model->deleteLicense($data['id']);
        exit($result);
    }
}
