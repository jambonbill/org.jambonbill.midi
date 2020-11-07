<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";


$dat=[];
$dat['POST']=$_POST;

switch($_POST['do']){


	case 'patchlist'://list patch
	//case 'list'://list patch
		$files=glob("xml/*.xml");
		$dat['list']=[];
		foreach($files as $file){
			$f=[];
			$f['file']=basename($file);
			$f['name']=patchName($file);
			//$f['Name']='';
			$dat['list'][]=$f;
		}
		exit(json_encode($dat));


	case 'load':
		$dat['xml']=patch("xml/".$_POST['filename']);
		exit(json_encode($dat));


	case 'save':
		exit(json_encode($dat));


	default:
		$dat=['error'=>'hello?'];
		$dat['post']=$_POST;
		exit(json_encode($dat));
}


function patch($filename=''){
	$xml=simplexml_load_file($filename);
	return $xml;
}

function patchName($filename='') {

	$xml=simplexml_load_file($filename);

	if ($xml === false) {
		echo "Failed loading XML: ";
    	foreach(libxml_get_errors() as $error) {
        	echo "<br>", $error->message;
    	}
    	return;
	}
	//print_r($xml);
	return trim($xml->name);
}