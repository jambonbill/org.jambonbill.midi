<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../vendor/autoload.php";

switch($_POST['do']){
	
	default:
		exit(json_encode(['error'=>'hello?']));
}
