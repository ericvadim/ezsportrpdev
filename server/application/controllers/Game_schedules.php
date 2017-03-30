<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game_schedules extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('game_schedule_model');
        $rows = $this->game_schedule_model->getGames();
        echo json_encode($rows);
        exit;
    }

    public function getgameschedules()
    {
        $this->load->database();
        $this->load->model('game_schedule_model');
        $rows = $this->game_schedule_model->getGameSchedules();
        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('game_schedule_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->game_schedule_model->saveGame($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('game_schedule_model');
        $result = $this->game_schedule_model->deleteGame($data['id']);
        exit($result);
    }
}
