<?php

namespace MIDI;

class MIDI
{

    private $config;
    private $db;
	private $UD;


	public function __construct ()
    {

        $filename=__DIR__."/../../profiles/".$_SERVER['HTTP_HOST'].".json";

        if (is_file($filename)) {
            // Load configuration
            $this->config = json_decode(file_get_contents($filename));
        }else{
            throw new \RuntimeException(__FUNCTION__.' error: no config file like '.$filename);
        }

        // Create PDO object
        $pdo=new Pdo;
        $this->db=$pdo->db();


        //User
        $this->UD=new UserDjango($this->db);
        $session = $this->UD->djangoSession();//
        //echo "<pre>session:";print_r($session);
        $this->user = $this->UD->user($session['session_data']);

    }

    public function db(){
        return $db;
    }

    public function create(){

    }

    public function update(){

    }


    public function search(){

    }

}
