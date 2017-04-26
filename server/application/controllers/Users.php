<?php

require dirname(__FILE__) . '/Base_Controller.php';

class Users extends Base_Controller
{

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        $this->load->model('User_model');
    }

    /**
     * Get all users
     */
    public function index_get()
    {
        if (!$this->protect()) {
            return;
        }
        $users = $this->User_model->findAll([
            'select' => 'first_name, last_name, id, email',
            'where' => 'status=1'
        ]);

        $this->set_response($users, 200);
    }

    /**
     * Update my profile information
     */
    public function myProfile_post()
    {
        if (!$this->protect()) {
            return;
        }
        $info = $this->_prepareProfileFormData($this->post());
        $currentUserId = $this->getCurrentUser()->userID;
        if ($this->User_model->update($currentUserId, $info)) {
            $newInfo = $this->User_model->findRowById($currentUserId);
            $newInfo->token = $this->getAuthToken();

            //find billing plan
            $newInfo->planId = $this->User_model->getPlanById($currentUserId);

            $this->set_response([
                'status' => 'OK',
                'message' => 'Your profile has been updated successfully',
                'user' => $newInfo
            ], 200);
        } else {
            $this->set_response([
                'status' => 'ERROR',
                'message' => 'Failed to save the profile information'
            ], 500);
        }
    }


    /**
     * Search users
     */
    public function search_post()
    {
        $options = $this->post();
        $where = 'status=1';

        if (!empty($options['term'])) {
            $term = addslashes($options['term']);
            $where .= " AND (nameFirst LIKE '%{$term}%' OR nameLast LIKE '%{$term}%' OR userName LIKE '%{$term}%')";
        }

        if (!empty($options['email'])) {
            $email = addslashes($options['email']);
            $where .= " AND (userName='{$email}' OR email='{$email}')";
        }

        $users = $this->User_model->findAll([
            'select' => 'nameFirst, nameLast, userID, avatar, userName',
            'where' => $where
        ]);

        $this->set_response($users, 200);
    }

    //process login
    public function login_post()
    {

        // delete expired access tokens
        $this->User_model->deleteExpiredTokens();

        $email = $this->post('email');
        $password = $this->post('password');
        $remember = $this->post('rememberMe');

        //query the database
        $result = $this->User_model->login($email, $password);

        $response = [
            'status' => 'OK'
        ];

        //if invalid login
        if (empty($result) || count($result) == 0) {
            $response['status'] = 'INCORRECT_LOGIN';
            $response['message'] = 'Incorrect username or password';
            $this->set_response($response, 401);
            return;
        }

        $user = $result[0];
        $response['user'] = $user;

        //set access token
        $token = $this->User_model->setAcessToken($user->id, $remember ? 14 : 0);
        $user->token = $token;

        /*
        //find billing plan
        $user->planId = $this->User_model->getPlanById($user->id);
        */

        $this->set_response($response, 200);
    }

    //process logout
    public function logout_post()
    {
        //query the database
        $this->User_model->logoutByToken($this->getAuthToken());
        $this->set_response([
            'status' => 'OK',
            'message' => 'Logged out successfully'
        ], 200);
    }

    //reset password
    public function resetPassword_post()
    {
        $email = $this->post('email');

        $result = $this->User_model->getUserByEmail($email);

        if (!empty($result)) {
            $newPassword = $this->get_random_string();

            // send email for regerate password
            $this->User_model->forgotPassword([
                'email' => $email,
                'password' => md5($newPassword)
            ]);

            $subject = 'Forgot Password';
            $body = 'Your new password is ' . $newPassword .'\r\n Please change your password.';
            /*
            $data_email = array(
                'first_name' => $result['first_name'],
                'last_name' => $result['last_name'],
                'password' => $newPassword,
                'subject' => $subject,
                'login' => base_frontend_url('signin')
            );

            // load forgot password template
            $body = $this->load->view('email/forgot_password_mail.php', $data_email, TRUE);

            $emailOptions = [
                'to' => $email,
                'message' => $body,
                'subject' => $subject
            ];
            if (send_email($emailOptions)) {
            */
            if (!mail($email, $subject, $body)) {
                $this->set_response([
                    'status' => 'OK',
                    'email' => $email,
                    'message' => 'We have just sent a new password to your email! Please check your inbox.'
                ], 200);
            } else {
                $this->set_response([
                    'status' => 'EMAIL_SEND_ERROR',
                    'email' => $email,
                    'message' => 'Unfortunately, we cannot send an email to your address.'
                ], 500);
            }
        } else {
            $this->set_response([
                'status' => 'EMAIL_NOT_FOUND',
                'email' => $email,
                'message' => 'Unfortunately, we cannot find an account associated to your email.'
            ], 404);
        }
    }

    /**
     * Register New user
     * nameFirst - First Name
     * nameLast - Last Name
     * email - email address
     * password
     */
    public function register_post()
    {
        $params = $this->post();
        $password = $params['password'];

        //check database if this email address has already been taken
        $existingUser = $this->User_model->getUserByEmail($params['email']);
        if (!empty($existingUser)) {
            $this->set_response([
                'status' => 'EMAIL_ALREADY_USED',
                'email' => $params['email'],
                'message' => $params['email'] . ' has already been used. Please try with another one.'
            ], 500);
            return;
        }

        $data = [
            'first_name' => $params['first_name'],
            'last_name' => $params['last_name'],
            'email' => $params['email'],
            'username' => $params['email'],
            'password' => md5($password)
        ];

        $userID = $this->User_model->insert($data);
        if (!empty($userID)) {
            // successfull registration
            $newClient = array(
                'client_id' => $data['username'],
                'client_secret' => $password,
                'grant_types' => 'client_credentials',
                'user_id' => $userID
            );

            $this->User_model->oauthClients($newClient);

            //send activate email
            $subject = 'Registration Successful!!! Activate your account.';
            $userIDKey = $this->encryptor('encrypt', $userID);
            $activation_link = base_frontend_url('/userActivate/' . $userIDKey);
            /*
            $data_email = array(
                'name' => $data['first_name'] . ' ' . $data['last_name'],
                'activation_link' => $activation_link,
                'userName' => $data['username'],
                'password' => $password
            );

            // load forgot password template
             $body = $this->load->view('email/registration_mail', $data_email, TRUE);


            $emailOptions = [
                'to' => $data['email'],
                'message' => $body,
                'subject' => $subject
            ];
            if (!send_email($emailOptions)) {
             */

            $body = 'Please click below link ' . $activation_link;


            // send email
            if (!mail($data['email'], $subject, $body)) {
                $this->set_response([
                    'status' => 'EMAIL_SEND_ERROR',
                    'email' => $data['email'],
                    'message' => 'Unfortunately, we cannot send an email to your address.'
                ], 500);
                return;
            }

            $this->set_response([
                'status' => 'OK',
                'message' => 'Account has been created successfully! You will be emailed with the activation link soon.'
            ], 200);

        } else {
            $this->set_response([
                'status' => 'ERROR',
                'message' => 'Unfortunately, we cannot proceed your signup request. Please try again later.'
            ], 500);
        }
    }

    public function activate_post()
    {
        $id = $this->encryptor('decrypt', $this->post('token'));
        $user = $this->User_model->getUserById($id);

        if (empty($user)) {
            $this->set_response([
                'status' => 'NOT_FOUND',
                'message' => 'Unfortunately, we cannot find your information. Please use correct activation link.'
            ], 404);
            return;
        }

        $data = array(
            'status' => 1
        );
        $this->User_model->update($id, $data);

        $this->set_response([
            'status' => 'OK',
            'message' => 'Your account has been activated successfully!'
        ], 200);

    }


    protected function get_random_string($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    // encrypt and decrypt
    protected function encryptor($action, $string)
    {
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

    protected function _prepareProfileFormData($info)
    {
        //if file has been selected
        if (!empty($_FILES['avatarData'])) {
            $this->load->library('upload', [
                'upload_path' => UPLOAD_PATH . '/users/',
                'allowed_types' => 'gif|jpg|png'
            ]);

            if (!$this->upload->do_upload('avatarData')) {
                $this->set_response([
                    'status' => 'ERROR',
                    'message' => $this->upload->display_errors()
                ], 500);
                return;
            } else {
                $uploadResult = $this->upload->data();
                //delete previous picture
                if (!empty($info['projectImage'])) {
                    @unlink(UPLOAD_PATH . '/users/' . $info['avatar']);
                }
                $info['avatar'] = $uploadResult['file_name'];
            }
        }
        if (!empty($info['password'])) {
            $info['password'] = md5($info['password']);
        }
        unset($info['avatarData']);
        unset($info['token']);
        return $info;
    }

}
