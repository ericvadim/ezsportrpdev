<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require dirname(__FILE__) . '/Base_Controller.php';

class Club_admin extends Base_Controller
{

    private $model = null;
    function __construct()
    {
        parent::__construct();
        $this->load->model('club_admin_model');
        $this->model = $this->club_admin_model;
    }

    public function index_get()
    {
        $clubId = $this->input->get('club_id');
        $rows = $this->club_admin_model->getRows($clubId);

        $this->set_response($rows, 200);
    }

    public function clubadminsWithPerson_get()
    {

        $clubId = $this->input->get('club_id');

        $rows = $this->model->getClubadminsWithPerson($clubId);

        $this->set_response($rows, 200);
    }

    public function index_post()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->model->saveRow($data);
        $this->set_response($result, 200);
    }

    public function index_delete()
    {
        $id = $this->input->get('id');

        $result = $this->model->deleteRowById($id);
        $this->set_response($result, 200);
    }
}
