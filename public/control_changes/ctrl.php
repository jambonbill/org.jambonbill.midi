<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$constants = get_defined_constants(true);
$json_errors = array();
foreach ($constants["json"] as $name => $value) {
    if (!strncmp($name, "JSON_ERROR_", 11)) {
        $json_errors[$value] = $name;
    }
}

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
			$raw=file_get_contents($configfile);
			$dat['raw']=$raw;

			$config=json_decode($raw);	
			
			if(json_last_error()){
				$dat['error']=$json_errors[json_last_error()];	
			}
			
			$dat['config']=$config;
		}else{
			$dat['error']="file not found";
		}
		
		
		exit(json_encode($dat));

	
	default:
		exit(json_encode(['error'=>'hello?']));
}
