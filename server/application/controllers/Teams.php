<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Teams extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('team_model');
        $clubId = $this->input->get('club_id');

        $rows = $this->team_model->getTeams($clubId);
        if (sizeof($rows)) {
            foreach ($rows as $key => $value) {
                $image = 'uploads/team_images/' . $value->id . '.jpg';
                $value->image = file_exists($image) ? base_url() . $image : './styles/img/no.jpg';
            }
        }

        echo json_encode($rows);
        exit;
    }

    public function getallteams () {
        $this->load->database();
        $this->load->model('team_model');

        $rows = $this->team_model->getAllTeamsWithClubs();
        if (sizeof($rows)) {
            foreach ($rows as $key => $value) {
                $image = 'uploads/team_images/' . $value->id . '.jpg';
                $value->image = file_exists($image) ? base_url() . $image : './styles/img/no.jpg';
            }
        }

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('team_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->team_model->saveTeam($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('team_model');
        $result = $this->team_model->deleteTeam($data['id']);
        exit($result);
    }
}
