<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . "/libraries/PHPExcel/Classes/PHPExcel.php";

class Persons extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('person_model');

        $division = $this->input->get('division');  // 0: all, 1: players, 2: coaches, 3: team managers, 4: referees.

        $rows = $this->person_model->getPersons($division);

        if (sizeof($rows)) {
            foreach ($rows as $key => $value) {
                $image = 'uploads/persons/' . $value['id'] . '.jpg';
                $rows[$key]['image'] = file_exists($image) ? base_url() . $image : './styles/img/no.jpg';
            }
        }

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('person_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->person_model->savePerson($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('person_model');
        $result = $this->person_model->deletePerson($data['id']);
        exit($result);
    }

    public function getjsonfromfile()
    {

        $this->load->model('person_model');

        $mime_type = (mime_content_type($_FILES['file']['tmp_name']));

        if ($mime_type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && $mime_type != 'application/vnd.ms-excel') {
            exit(json_encode(array('status' => 'excel_type_error')));
        }

        try {
            $objPHPExcel = PHPExcel_IOFactory::load($_FILES['file']['tmp_name']);
        } catch (Exception $e) {
            exit(json_encode(array('status' => 'excel_type_error')));
        }

        $allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null, true, true, true);


        $sub_id = $this->input->get('sub_id');
        $page_id = $this->input->get('page_id');
        $conds = $this->conditionFields($page_id);

        $data = array();
        if (sizeof($allDataInSheet)) {
            $data['headers'] = $allDataInSheet[1];

            $tempAry = array();
            $n = 0;
            foreach ($allDataInSheet as $key => $val) {
                if ($key == 1) continue;

                $is_blank = true; $checkFields = array();
                foreach($conds as $cRow){
                    if($cRow[1] == '') continue;
                    if ($val[$cRow[0]] != '')
                        $is_blank = false;
                    $checkFields[$cRow[1]] = $val[$cRow[0]];
                }

                if ($is_blank) continue;

                $tempAry[$n] = $val;
                $tempAry[$n]['id'] = $key;

                $person_row = $this->person_model->getPersonByCondition($checkFields);

                $tempAry[$n]['isExist'] = 0;
                $tempAry[$n]['person_id'] = '';
                $tempAry[$n]['isSubRow'] = 0;
                if (!is_null($person_row)) {
                    $tempAry[$n]['isExist'] = 1;
                    $tempAry[$n]['person_id'] = $person_row['id'];
                    $sub_row = $this->person_model->getSubRelationByPerson($person_row['id'], $sub_id, $page_id);
                    if (!is_null($sub_row))
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

        $data = json_decode(file_get_contents('php://input'), true);
        $teamId = $this->input->get('team_id');
        $pageId = $this->input->get('page_id');

        if($pageId == 'player'){
            $this->load->model('player_model');
            $submodel = $this->player_model;
        } else if ($pageId == 'coache') {
            $this->load->model('coach_model');
            $submodel = $this->coach_model;
        } else if ($pageId == 'manager') {
            $this->load->model('manager_model');
            $submodel = $this->manager_model;
        } else if ($pageId == 'referee') {
            $this->load->model('referee_model');
            $submodel = $this->referee_model;
        } else if ($pageId == 'clubadmin') {
            $this->load->model('club_admin_model');
            $submodel = $this->club_admin_model;
        }

        $fields = $submodel->getFields();
        $person_fields = $this->person_model->getInFields($fields);

        $resAry = array();

        if (sizeof($data)) {
            $n = 0;
            foreach ($data as $person) {
                $personData = array('id' => '');
                foreach ($person_fields as $key => $val) {
                    if ($val == 'birthday') {
                        $personData[$val] = convertDate($person[$key]);
                    } else if ($val == 'gender') {
                        $personData[$val] = $person[$key] == 'Male' ? 0 : 1;
                    } else {
                        $personData[$val] = $person[$key];
                    }
                }

                if ($person['person_id'] == '') {
                    $personId = $this->person_model->savePerson($personData);   // saving a person.
                    $resAry[$n] = $personId;
                } else {
                    $personId = $person['person_id'];
                    $resAry[$n] = $personId;
                }


                $submodel->setInsertData($teamId, $personId, $person);
                $n++;
            }
        }
        exit(json_encode($resAry));
    }

    private function conditionFields($pageId)
    {
        $fld = array(
            'player' => array(array('A', 'first_name'), array('B', 'last_name'), array('G', 'birthday')),
            'coache' => array(array('A', 'first_name'), array('B', 'last_name'), array('G', 'city')),
            'manager' => array(array('A', 'first_name'), array('B', 'last_name'), array('G', 'city')),
            'referee' => array(array('A', 'first_name'), array('B', 'last_name'), array('D', 'cell_phone')),
            'clubadmin' => array(array('A', 'first_name'), array('B', 'last_name'), array('D', 'cell_phone')),
        );
        return $fld[$pageId];
    }
}
