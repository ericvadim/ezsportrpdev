<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Managers extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('manager_model');
        $teamId = $this->input->get('team_id');

        $rows = $this->manager_model->getManagers($teamId);

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
        $this->load->model('manager_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $teamId = $this->input->get('team_id');

        $rulesForPerson = array(
            'A' => 'first_name',
            'B' => 'last_name',
            'C' => 'cell_phone',
            'D' => 'home_phone',
            'E' => 'contact_email',
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

                $managerData = array(
                    'id' => '',
                    'team_id' => $teamId,
                    'person_id' => $personId
                );
                $result = $this->manager_model->saveManager($managerData);     // saving a player.
            }
        }
        exit($result);
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('manager_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->manager_model->saveManager($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('manager_model');
        $result = $this->manager_model->deleteManager($data['id']);
        exit($result);
    }
}
