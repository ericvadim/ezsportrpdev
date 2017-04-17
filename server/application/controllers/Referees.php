<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . "/libraries/PHPExcel/Classes/PHPExcel.php";

class Referees extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('referee_model');
        $clubId = $this->input->get('club_id');
        $rows = $this->referee_model->getReferees($clubId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('referee_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->referee_model->saveReferee($data);
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
        $this->load->model('person_model');
        $this->load->model('referee_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $clubId = $this->input->get('club_id');

        $rulesForPerson = array(
            'A' => 'first_name',
            'B' => 'last_name',
            'C' => 'home_phone',
            'D' => 'cell_phone',
            'E' => 'email',
            'F' => 'address',
            'G' => 'city',
            'H' => 'state',
            'I' => 'zipcode'
        );

        if (sizeof($data)) {
            foreach ($data as $person) {
                $personData = array('id' => '');
                foreach ($rulesForPerson as $key => $val) {
                    $personData[$val] = $person[$key];
                }
                $personId = $this->person_model->savePerson($personData);   // saving a person.

                $refereeData = array(
                    'id' => '',
                    'club_id' => $clubId,
                    'person_id' => $personId,
                    'grade' => $person['J']
                );
                $result = $this->referee_model->saveReferee($refereeData);     // saving a referee.
            }
        }
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('referee_model');
        $result = $this->referee_model->deleteReferee($data['id']);
        exit($result);
    }
}
