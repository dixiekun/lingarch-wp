<?php
/**
 * WordPress configuration for Local by Flywheel
 */

// ** MySQL settings - Railway ** //
define( 'DB_NAME', $_ENV['MYSQL_DATABASE'] ?? 'railway' );
define( 'DB_USER', $_ENV['MYSQL_USER'] ?? 'root' );
define( 'DB_PASSWORD', $_ENV['MYSQL_PASSWORD'] ?? 'password' );
define( 'DB_HOST', $_ENV['MYSQL_HOST'] ?? 'localhost' );
define( 'DB_PORT', $_ENV['MYSQL_PORT'] ?? '3306' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ** Authentication Unique Keys and Salts ** //
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

// ** WordPress Database Table prefix ** //
$table_prefix = 'wp_';

// ** WordPress debugging ** //
define('WP_DEBUG', false);

// ** Absolute path to the WordPress directory ** //
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

// ** Sets up WordPress vars and included files ** //
require_once(ABSPATH . 'wp-settings.php');