<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$SIDV2=new MIDI\SIDV2;

$dat=[];

switch($_POST['do']){
	
	case 'browse':
		
		$f=glob("syx/*.syx");
		
		foreach($f as $file)
		{
			$finfo=[];
			$finfo['patch']=$SIDV2->patchInfo($file);
			$finfo['basename']=basename($file);			
			$dat['files'][]=$finfo;
		}
		exit(json_encode($dat));

	case 'preview':
		$dat['POST']=$_POST;
		$filename="./syx/".$_POST['file'];
		$dat['patch']=$SIDV2->patchInfo($filename);
		$dat['bin']=base64_encode($SIDV2->patchBinary($filename));
		exit(json_encode($dat));
	
	default:
		exit(json_encode(['error'=>'hello?']));
}

