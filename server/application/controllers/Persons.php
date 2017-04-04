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

        $rows = $this->person_model->getPersons();
        if (sizeof($rows)) {
            foreach ($rows as $key => $value) {
                $image = 'uploads/persons/' . $value->id . '.jpg';
                $value->image = file_exists($image) ? base_url() . $image : './styles/img/no.jpg';
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
