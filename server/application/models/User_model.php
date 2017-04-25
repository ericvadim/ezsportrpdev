<?php

class User_model extends Base_model
{

    protected $_table = 'ci_users';
    protected $_primaryCol = 'id';

    // login
    public function login($email, $password)
    {
        $this->db->select('*');
        $this->db->from($this->_table);
        $this->db->where('email', $email);
        $this->db->where('status', 1);
        $this->db->where('password', MD5($password));
        $this->db->limit(1);

        $query = $this->db->get();

        if ($query->num_rows() == 1) {
            return $query->result();
        } else {
            return false;
        }
    }

    public function setAcessToken($userID, $expireDays = 0)
    {
        $token = md5($userID . '-' . time() . '-' . rand());
        $expires = time() + 3600 * 2; //expire after 2 hours in default
        if ($expireDays > 0) {
            $expires = time() + 3600 * 24 * $expireDays;
        }

        $this->db->insert('ci_access_tokens', [
            'token' => $token,
            'user_id' => $userID,
            'expires' => date('Y-m-d H:i:s', $expires),
            'createdOn' => date('Y-m-d H:i:s')
        ]);
        return $token;
    }

    public function deleteExpiredTokens()
    {
        $this->db->where('expires <=', date('Y-m-d H:i:s'));
        $this->db->delete('ci_access_tokens');
    }

    public function isValidToken($token)
    {
        $this->db->select('user_id');
        $this->db->from('ci_access_tokens');
        $this->db->where('token', $token);

        $query = $this->db->get();

        if ($query->num_rows() == 0) {
            return null;
        }

        return $query->row()->user_id;
    }

    public function getUserByToken($token)
    {
        $userID = $this->isValidToken($token);

        $this->db->select('*');
        $this->db->from($this->_table);
        $this->db->where('id', $userID);

        $query = $this->db->get();

        return $query->row();
    }

    public function logoutByToken($token)
    {
        $this->db->where('token', $token);
        $this->db->delete('ci_access_tokens');
    }

    // get userdetail from email
    public function getUserByEmail($email)
    {
        $email = strip_tags($email);
        $this->db->select("u.*");
        $this->db->where("u.email", $email);
        $user = $this->db->get($this->_table . ' as u');

        return $user->row_array();
    }

    /**
     * Get subscribed plan by user id
     * @param $userId
     * @return string
     */
    public function getPlanById($userId)
    {
        $this->load->model('BillingCustomer_model');
        $customerInfo = $this->BillingCustomer_model->findRowByUserId($userId);
        if (!empty($customerInfo)) {
            return $customerInfo->planId;
        }
        return null;
    }

    // get userdetail from username
    public function getUserByUserName($username)
    {
        $email = strip_tags($username);
        $this->db->select("u.*");
        $this->db->where("u.userName", $username);
        $user = $this->db->get($this->_table . ' as u');

        return $user->row_array();
    }

    // get userdetail from user id
    public function getUserById($id)
    {
        return parent::findRowById($id);
    }

    // get password
    public function forgotPassword($data = array())
    {
        //Type casting
        $email = strip_tags($data['email']);
        $this->db->where('email', $email);
        $this->db->where('status', '1');
        $this->db->update($this->_table, $data);
    }


    //insert into oauth clients
    function oauthClients($data)
    {
        return $this->db->insert('ci_oauth_clients', $data);
    }

    // update oauth data
    function oauthUpdate($data, $user_id)
    {
        $this->db->where('user_id', $user_id);
        $this->db->update('ci_oauth_clients', $data);
    }
}
