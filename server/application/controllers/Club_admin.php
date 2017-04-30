<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . "/libraries/PHPExcel/Classes/PHPExcel.php";

class Club_admin extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('club_admin_model');
        $clubId = $this->input->get('club_id');
        $rows = $this->club_admin_model->getClubAdmins($clubId);

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('club_admin_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->club_admin_model->saveClubAdmin($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('club_admin_model');
        $result = $this->club_admin_model->deleteClubAdmin($data['id']);
        exit($result);
    }
}
