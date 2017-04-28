<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";


$dat=[];
$dat['POST']=$_POST;
switch($_POST['do']){



	case 'list':
		$dat['files']=glob("xml/*.xml");
		exit(json_encode($dat));

	case 'load':
		exit(json_encode($dat));

	case 'save':
		exit(json_encode($dat));


	default:
		$dat=['error'=>'hello?'];
		$dat['post']=$_POST;
		exit(json_encode($dat));
}
