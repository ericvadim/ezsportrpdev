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
        $this->load->model('player_model');

        $schedules = $this->game_schedule_model->getGameSchedules();
        $results = array();
        if (sizeof($schedules)) {
            foreach ($schedules as $key => $val) {
                $results[$key] = array(
                    'id' => $val->id,
                    'league_name' => $val->league_name,
                    'league_id' => $val->league_id,
                    'game_date' => $val->game_date,
                    'start_time' => $val->start_time,
                    'arrival_time' => $val->arrival_time,
                    'duration' => $val->duration,
                    'field_id' => $val->field_id,
                    'uniform' => $val->uniform,
                    'home_team' => array(
                        'team_id' => $val->home_team_id,
                        'team_name' => $val->home_team_name,
                        'players' => $this->player_model->getPlayers($val->home_team_id)
                    ),
                    'away_team' => array(
                        'team_id' => $val->away_team_id,
                        'team_name' => $val->away_team_name,
                        'players' => $this->player_model->getPlayers($val->away_team_id)
                    )
                );
            }
        }
        echo json_encode($results);
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
