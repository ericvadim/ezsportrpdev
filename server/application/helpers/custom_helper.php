<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('send_email')) {
    function send_email($options)
    {
        $CI =& get_instance();
        $CI->load->library('email');
        $config = array(
            'protocol' => 'smtp',
            'smtp_host' => SMTP_HOST,
            'smtp_port' => SMTP_PORT,
            'smtp_user' => SMTP_USERNAME,
            'smtp_pass' => SMTP_PASSWORD,
            'mailtype' => 'html',
            'charset' => 'utf-8',
            'wordwrap' => true,
            'crlf' => "\r\n",
            'newline' => "\r\n"
        );

        $CI->email->initialize($config);

        $CI->email->from(SITE_FROM_EMAIL, SITE_NAME);
        $CI->email->to($options['to']);
        $CI->email->subject($options['subject']);
        $CI->email->message($options['message']);

        // send email
        return $CI->email->send();
    }
}
if (!function_exists('base_frontend_url')) {
    function base_frontend_url($uri = '')
    {
        if (strpos($_SERVER['SERVER_NAME'], 'localhost') !== false) {
            $baseUrl = 'http://localhost:8888/#';
        } else {
            $baseUrl = 'http://' . $_SERVER['SERVER_NAME'] . '/#';
        }
        return $baseUrl . $uri;
    }
}

if (!function_exists('recursive_copy')) {
    function recursive_copy($source, $dest)
    {
        if (is_dir($source)) {
            if (!is_dir($dest)) {
                mkdir($dest, 0777, true);
            }

            $dir_items = array_diff(scandir($source), array('..', '.'));

            if (count($dir_items) > 0) {
                foreach ($dir_items as $v) {
                    recursive_copy(rtrim(rtrim($source, '/'), '\\') . DIRECTORY_SEPARATOR . $v, rtrim(rtrim($dest, '/'), '\\') . DIRECTORY_SEPARATOR . $v);
                }
            }
        } elseif (is_file($source)) {
            copy($source, $dest);
        }
    }
}

if (!function_exists('convertDate')) {
    function convertDate($datestr, $fromtype='mm/dd/yyyy', $totype='yyyy-mm-dd')
    {
        if(is_null($datestr) || $datestr == '') return '';
        $dateAry = preg_split("/[\-\/]/", $datestr);

        if(sizeof($dateAry) < 2) return '';

        return $dateAry[2] . '-' .$dateAry[0] . '-' . $dateAry[1];
    }
}