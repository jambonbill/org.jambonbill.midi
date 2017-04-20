<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$dat=[];
switch($_POST['do']){
	
	case 'browse':
		
		$f=glob("../../midifiles/*.mid");
		foreach($f as $file){
			
			$f=[];
			$f['name']=basename($file);
			$f['size']=filesize($file);
			$dat['files'][]=$f;
		}
		exit(json_encode($dat));
	
	
	case 'getConfig':
		$dat['POST']=$_POST;
		$configfile="configs/".$_POST['filename'];
		if(is_file($configfile)){
			$config=json_decode(file_get_contents($configfile));	
			$dat['config']=$config;
		}else{
			$dat['error']="file not found";
		}
		
		
		exit(json_encode($dat));

	
	default:
		exit(json_encode(['error'=>'hello?']));
}
