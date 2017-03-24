<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Fields extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('field_model');

        $rows = $this->field_model->getFields();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('field_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->field_model->saveField($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('field_model');
        $result = $this->field_model->deleteField($data['id']);
        exit($result);
    }
}
