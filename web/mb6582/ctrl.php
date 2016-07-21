<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$dat=[];
switch($_POST['do']){
	
	case 'browse':
		
		$SIDV2=new MIDI\SIDV2;

		$f=glob("syx/*.syx");
		
		foreach($f as $file)
		{
			$finfo=[];
			$finfo['patch']=$SIDV2->patchInfo($file);
			//$finfo['size']=filesize($file);
			$finfo['basename']=basename($file);
			
			$dat['files'][]=$finfo;
		}

		exit(json_encode($dat));

	case 'preview':
		$dat['POST']=$_POST;
		exit(json_encode($dat));
	
	default:
		exit(json_encode(['error'=>'hello?']));
}

