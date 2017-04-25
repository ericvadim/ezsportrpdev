<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/*from email address */
define('SITE_FROM_EMAIL', 'admin@ezsportrp.com');
/*site name */
define('SITE_NAME', 'EZSport');
/*smtp host setting */
define('SMTP_HOST', 'smtp.sendgrid.net');
/*set smtp port */
define('SMTP_PORT', '587');
/*set smtp password */
define('SMTP_PASSWORD', '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');
/*set smtp username */
define('SMTP_USERNAME', 'apikey');

define('ROLE_VIEWER', 0);
define('ROLE_CLIENT', 1);
define('ROLE_ADMIN', 2);
define('ROLE_AUTHOR', 3);
define('ROLE_PRESENTER', 4);

define('UPLOAD_PATH', FCPATH . 'assets' . DIRECTORY_SEPARATOR . 'uploads');

//stripe account key for test env
define('STRIPE_SECRET_KEY', 'sk_test_AAM8YWtQ6AT5VLfxhstw2otQ');
define('STRIPE_PUBLIC_KEY', 'pk_test_cdLLgDyiAsx7cclYYy6XekwY');

//stripe account key for live env
//define('STRIPE_SECRET_KEY', 'sk_live_OEeL0GfnRQDyqmw72TxZ3ecW');
//define('STRIPE_PUBLIC_KEY', 'pk_live_yP4CTJyRujkhO4jyMnVQ3ONp');