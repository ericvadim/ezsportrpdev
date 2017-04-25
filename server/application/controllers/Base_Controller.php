<?php

defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . '/libraries/REST_Controller.php';

// use namespace
use Restserver\Libraries\REST_Controller;

/**
 * This is an example of a few basic user interaction methods you could use
 * all done with a hardcoded array
 *
 * @package         CodeIgniter
 * @subpackage      Rest Server
 * @category        Controller
 * @author          Phil Sturgeon, Chris Kacerguis
 * @license         MIT
 * @link            https://github.com/chriskacerguis/codeigniter-restserver
 */
class Base_Controller extends REST_Controller
{

    protected $_currentUser = null;

    public function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('User_model');
    }

    protected function getAuthToken()
    {
        return $this->head('x-auth-token');
    }

    protected function getCurrentUser()
    {
        if (empty($this->_currentUser)) {
            $this->_currentUser = $this->User_model->getUserByToken($this->getAuthToken());
        }
        return $this->_currentUser;
    }

    protected function protect()
    {
        $this->User_model->deleteExpiredTokens();

        if (empty($this->User_model->isValidToken($this->getAuthToken()))) {
            $this->set_response([
                'status' => 'UNAUTHORIZED',
                'message' => 'You need to login first'
            ], 401);
            return false;
        }
        return true;
    }

    // Check if current user is owner of the project
    protected function checkProjectOwner($projectId)
    {
        if (!$this->protect()) {
            return false;
        }

        $this->load->model('Project_model');
        if (!$this->Project_model->checkPermission($projectId, $this->getCurrentUser()->userID, ROLE_PRESENTER)) {
            $this->set_response([
                'status' => 'BAD_REQUEST',
                'message' => 'You are not an owner of this project'
            ], 400);
            return false;
        }
        return true;
    }

    //send invite email
    protected function sendInviteEmail($recieverId, $role, $data = array())
    {
        $this->load->model('Project_model');
        $currentUser = $this->getCurrentUser();
        $receiver = $this->User_model->findRowById($recieverId);
        $project = $data['project'];
        switch ((int)$role) {
            case ROLE_CLIENT:
                $subject = 'You are assigned qwire client';
                $body = 'email/payor_mail.php';
                break;
            case ROLE_PRESENTER:
                $subject = 'You are assigned presenter of project ' . $project->name;
                $body = 'email/presenter_mail.php';
                break;
            case ROLE_AUTHOR:
                $subject = 'You are assigned author of project ' . $project->name;
                $body = 'email/author_mail.php';
                break;
            case ROLE_VIEWER:
                $subject = 'You are assigned viewer of project ' . $project->name;
                $body = 'email/viewer_mail.php';
                break;
        }

        $templateData = array(
            'receiver' => $receiver->nameFirst,
            'sender' => $currentUser->nameFirst . ' ' . $currentUser->nameLast,
            'project' => $project->name,
            'login' => base_frontend_url()
        );
        if (!empty($data['presentation'])) {
            $templateData['presentation'] = $data['presentation']->name;
        }
        if (isset($data['message'])) {
            $templateData['message'] = $data['message'];
        }

        $body = $this->load->view($body, $templateData, TRUE);

        // email settings
        return send_email([
            'to' => $receiver->emailAddress,
            'message' => $body,
            'subject' => $subject
        ]);
    }
}
