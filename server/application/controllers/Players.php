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

        $this->load->model('person_model');

        $objPHPExcel = PHPExcel_IOFactory::load($_FILES['file']['tmp_name']);
        $allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);


        //$rulesForPerson = $this->getFieldsAry();

        $sub_id = $this->input->get('sub_id');
        $page_id = $this->input->get('page_id');

        $data = array();
        if (sizeof($allDataInSheet)) {
            $data['headers'] = $allDataInSheet[1];
            $indAry = array('first' => '', 'last' => '', 'birthdate' => '');

            foreach($allDataInSheet[1] as $ind => $val){
                if(strtolower(trim($val)) == 'first')
                    $indAry['first'] = $ind;

                if(strtolower(trim($val)) == 'last')
                    $indAry['last'] = $ind;

                if(strtolower(trim($val)) == 'birthdate')
                    $indAry['birthdate'] = $ind;

            }

            $tempAry = array(); $n = 0;
            foreach ($allDataInSheet as $key => $val) {
                if ($key == 1) continue;

                $tempAry[$n] = $val;
                $tempAry[$n]['id'] = $key;

                $checkFields = array('first_name' => $val[$indAry['first']], 'last_name' => $val[$indAry['last']], 'birthday' => $val[$indAry['birthdate']]);
                $person_row = $this->person_model->getPersonByCondition($checkFields);

                $tempAry[$n]['isExist'] = 0;
                $tempAry[$n]['person_id'] = '';
                $tempAry[$n]['isSubRow'] = 0;
                if (!is_null($person_row)) {
                    $tempAry[$n]['isExist'] = 1;
                    $tempAry[$n]['person_id'] = $person_row['id'];
                    $sub_row = $this->person_model->getSubRelationByPerson($person_row['id'], $sub_id, $page_id);
                    if(!is_null($sub_row))
                        $tempAry[$n]['isSubRow'] = 1;
                }
                $n++;
            }
            $data['data'] = $tempAry;
        }
        exit(json_encode($data));
    }

    public function import()
    {
        $this->load->model('person_model');
        $this->load->model('player_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $teamId = $this->input->get('team_id');

        $rulesForPerson = $this->getFieldsAry();

        $resAry = array();

        if (sizeof($data)) {
            $n = 0;
            foreach ($data as $person) {
                $personData = array('id' => '');
                $personData['gender'] = $person['M'] == 'Male' ? 0 : 1;
                foreach ($rulesForPerson as $key => $val) {
                    if ($val == 'birthday') {
                        $personData[$val] = convertDate($person[$key]);
                    } else if ($val == 'gender') {
                        $personData[$val] = $person[$key] == 'Male' ? 0 : 1;
                    } else {
                        $personData[$val] = $person[$key];
                    }
                }
                if ($person['person_id'] == ''){
                    $personId = $this->person_model->savePerson($personData);   // saving a person.
                    $resAry[$n] = $personId;
                } else {
                    $personId = $person['person_id'];
                    $resAry[$n] = $personId;
                }

                $playerData = array(
                    'id' => '',
                    'team_id' => $teamId,
                    'person_id' => $personId,
                    'player_number' => $person['H'],
                    'identifier' => $person['J'],
                    'position_id' => ''
                );
                $this->player_model->savePlayer($playerData);     // saving a player.
                $n++;
            }
        }
        exit(json_encode($resAry));
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('player_model');
        $result = $this->player_model->deletePlayer($data['id']);
        exit($result);
    }

    private function getFieldsAry(){
        $rulesForPerson = array(
            'A' => 'first_name',
            'B' => 'last_name',
            'C' => 'address',
            'D' => 'city',
            'E' => 'state',
            'F' => 'zipcode',
            'G' => 'birthday',
            'K' => 'email',
            'L' => 'home_phone',
            'M' => 'gender',
            'N' => 'contact_name',
            'O' => 'contact_phone',
            'P' => 'contact_email'
        );
        return $rulesForPerson;
    }
}
