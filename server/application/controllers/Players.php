<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Players extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('player_model');

        $teamId = $this->input->get('team_id');

        $rows = $this->player_model->getPlayers($teamId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('player_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->player_model->savePlayer($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('player_model');
        $result = $this->player_model->deletePlayer($data['id']);
        exit($result);
    }
}
