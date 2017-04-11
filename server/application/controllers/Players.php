<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . "/libraries/PHPExcel/Classes/PHPExcel.php";

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

    public function getjsonfromfile()
    {
        $objPHPExcel = PHPExcel_IOFactory::load($_FILES['file']['tmp_name']);
        $allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);

        $data = array();
        if (sizeof($allDataInSheet)) {
            $data['headers'] = array_values($allDataInSheet[1]);
            $data['data'] = array();
            foreach ($allDataInSheet as $key => $val) {
                if ($key > 1) { // except for header row.
                    $data['data'][] = $val;
                    $data['data'][sizeof($data['data']) - 1]['id'] = $key;
                }
            }
        }
        exit(json_encode($data));
    }

    public function import()
    {
        $this->load->database();
        $this->load->model('player_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->player_model->importPlayers($data);
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
