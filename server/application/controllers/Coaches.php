<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . "/libraries/PHPExcel/Classes/PHPExcel.php";

class Coaches extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $teamId = $this->input->get('team_id');

        $this->load->database();
        $this->load->model('coach_model');

        $rows = $this->coach_model->getCoaches($teamId);

        echo json_encode($rows);
        exit;
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
        $this->load->model('person_model');
        $this->load->model('coach_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $teamId = $this->input->get('team_id');

        $rulesForPerson = array(
            'C' => 'first_name',
            'D' => 'last_name',
            'E' => 'contact_phone',
            'F' => 'contact_email',
            'G' => 'address'
        );

        if (sizeof($data)) {
            foreach ($data as $person) {
                $personData = array('id' => '');
                foreach ($rulesForPerson as $key => $val) {
                    $personData[$val] = $person[$key];
                }
                $personId = $this->person_model->savePerson($personData);   // saving a person.

                $coachData = array(
                    'id' => '',
                    'team_id' => $teamId,
                    'person_id' => $personId
                );
                $result = $this->coach_model->saveCoach($coachData);     // saving a player.
            }
        }
        exit($result);
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('coach_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->coach_model->saveCoach($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('coach_model');
        $result = $this->coach_model->deleteCoach($data['id']);
        exit($result);
    }
}
