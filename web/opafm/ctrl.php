<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";


$dat=[];
$dat['POST']=$_POST;
switch($_POST['do']){

	case 'save':
		exit(json_encode($dat));


	default:
		$dat=['error'=>'hello?'];
		$dat['post']=$_POST;
		exit(json_encode($dat));
}
