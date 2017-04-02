<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Game_records extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('game_record_model');

        $gameId = $this->input->get('game_id');
        $rows = $this->game_record_model->getGameRecords($gameId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('game_record_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->game_record_model->saveGameRecord($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('game_record_model');
        $result = $this->game_record_model->deleteGameRecord($data['id']);
        exit($result);
    }
}
