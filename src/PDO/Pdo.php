<?php

namespace PDO;

class Pdo
{
    protected static $db_host     = '';
    protected static $db_name     = '';
    protected static $db_driver   = '';
    protected static $db_user     = '';
    protected static $db_pass     = '';
    protected static $dsn = '';
    protected static $db = null;
    //public $db = null;
    protected static $failed = false;

    public function __construct ()
    {
        //echo "__construct()";die();
        self::getConfig();
        return $this->db();
    }

    public static function getConfig ()
    {
        //echo "getConfig ($configfile = '');\n";
        if (is_file(__DIR__."/config.json")) {

            // Load configuration
            $config = json_decode(file_get_contents(__DIR__."/config.json"));

            if ($err=json_last_error()) {
                die("Error: Invalid config.json");
            }


            self::$db_host = $config->pdo->host;
            self::$db_name = $config->pdo->name;
            self::$db_driver=$config->pdo->driver;
            self::$db_user = $config->pdo->user;
            self::$db_pass = $config->pdo->pass;
        } else {
            throw new \RuntimeException(__FUNCTION__.' error: no config file');
        }
    }


    public static function getDatabase()
    {
        //echo __FUNCTION__."()\n";exit;
        self::getConfig();

        try {
            $dsn     = self::$db_driver.":host=".self::$db_host.";dbname=".self::$db_name;
            //echo "dsn=$dsn";
            self::$db = new \PDO($dsn, self::$db_user, self::$db_pass);
        } catch (PDOException $e) {
            self::$failed = true;
            echo "<li>" . $e->getMessage();
        }
        return self::$db;
    }

    public function db()
    {
        return $this->getDatabase();
    }
}
