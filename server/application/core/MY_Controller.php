<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->database();
        $this->load->model('Account_model');
        $this->load->model('Client_model');
        $this->load->model('Connection_model');
        $this->load->model('Presentation_model');
        $this->load->model('Project_model');
        $this->load->model('User_model');
        $this->load->helper(array('form', 'url'));
        $this->load->library(array('session', 'form_validation', 'email'));
        $this->is_logged_in();
    }

    // encrypt and decrypt 
    protected function encryptor($action, $string) {
        $output = false;

        $encrypt_method = "AES-256-CBC";
        //pls set your unique hashing key
        $secret_key = 'qwire';
        $secret_iv = 'qwireharmony';

        // hash
        $key = hash('sha256', $secret_key);

        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);

        //do the encyption given text/string/number
        if ($action == 'encrypt') {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if ($action == 'decrypt') {
            //decrypt the given text/string/number
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }

        return $output;
    }

    // get random string
    protected function get_random_string($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
    // check if user is logged in or not
    protected function is_logged_in() {
        if (!$this->session->userdata('logged_in')) {
            //If no session, redirect to login page
            redirect('user', 'refresh');
        }
    }
    
    // get template for email and send mail    
      public function send_email($reciever_id, $role, $project_id = 0) {
        $login_data = $this->session->userdata('logged_in');
        $sender = $this->Account_model->get_by_id($login_data['userID']);
        $receiver = $this->Account_model->get_by_id($reciever_id);
        $project = array();
        switch ($role) {
            case "payor":
                $subject = 'You are assigned qwire client';
                $body = 'email/payor_mail.php';
                break;
            case "presenter":
                $project = $this->Project_model->get_by_id($project_id);
                $subject = 'You are assigned presenter of project ' . $project->name;
                $body = 'email/presenter_mail.php';
                break;
            case "author":
                $project = $this->Project_model->get_by_id($project_id);
                $subject = 'You are assigned author of project ' . $project->name;
                $body = 'email/author_mail.php';
                break;
            case "viewer":
                $project = $this->Project_model->get_by_id($project_id);
                $subject = 'You are assigned viewer of project ' . $project->name;
                $body = 'email/viewer_mail.php';
                break;
        }
        $to = $receiver->emailAddress;
        $data_email = array(
            'receiver' => $receiver->nameFirst,
            'sender' => $sender->nameFirst . ' ' . $sender->nameLast,
            'project' => $project->name,
            'login' => base_url(),
        );
        $body = $this->load->view($body, $data_email, TRUE);
        // load forgot password template
        // email settings 
        $response = $this->mail($to, $subject, $body);
    
    }
    // send mail functionality
    protected function mail($to , $subject, $body){
            $config = array(
            'protocol' => 'smtp',
            'smtp_host' => SMTP_HOST,
            'smtp_port' => SMTP_PORT,
            'smtp_user' => SMTP_USERNAME,
            'smtp_pass' => SMTP_PASSWORD,
            'mailtype' => 'html',
            'charset' => 'utf-8',
            'wordwrap' => true
        );

        $this->email->set_newline("\r\n");
        $this->email->initialize($config);
        $this->email->from(SITE_FROM_EMAIL, SITE_NAME);
        $this->email->to($to);
        $this->email->subject($subject);
        $this->email->message($body);

        // send email
        if (!$this->email->send()) {
            // error message
            $response = $this->email->print_debugger();
        } else {
            $response = 'sent';
        }
        return $response;
    }
    
}

/* End of file Account.php */
/* Location: ./application/controllers/Account.php */
