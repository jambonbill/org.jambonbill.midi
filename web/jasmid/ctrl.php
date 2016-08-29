<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$dat=[];
switch($_POST['do']){
	
	case 'browse':
		
		$f=glob("mid/*.mid");
		foreach($f as $file){
			
			$f=[];
			$f['name']=basename($file);
			$f['size']=filesize($file);
			$dat['files'][]=$f;
		}
		exit(json_encode($dat));
	
	default:
		exit(json_encode(['error'=>'hello?']));
}
