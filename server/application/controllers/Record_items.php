<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Record_items extends CI_Controller
{

    public function index()
    {
        exit('bad request!');
    }

    public function get()
    {
        $this->load->database();
        $this->load->model('record_item_model');

        $rows = $this->record_item_model->getRecordItems();

        echo json_encode($rows);
        exit;
    }

    public function save()
    {
        $this->load->database();
        $this->load->model('record_item_model');
        $data = json_decode(file_get_contents('php://input'), true);
        $result = $this->record_item_model->saveRecordItem($data);
        exit($result);
    }

    public function delete()
    {
        $data = $this->input->get();

        $this->load->database();
        $this->load->model('record_item_model');
        $result = $this->record_item_model->deleteRecordItem($data['id']);
        exit($result);
    }
}
