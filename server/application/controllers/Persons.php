<?php
defined('BASEPATH') OR exit('No direct script access allowed');

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
}
