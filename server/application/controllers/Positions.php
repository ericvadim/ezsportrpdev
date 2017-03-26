<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Positions extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('position_model');
        $sportId = $this->input->get('sport_id');

        $rows = $this->position_model->getPositions($sportId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('position_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->position_model->savePosition($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('position_model');
        $result = $this->position_model->deletePosition($data['id']);
        exit($result);
    }
}
