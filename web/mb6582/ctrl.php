<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$dat=[];
switch($_POST['do']){
	
	case 'browse':
		
		$f=glob("syx/*.syx");
		
		foreach($f as $file)
		{
			$finfo=[];
			$finfo['size']=filesize($file);
			$finfo['name']=basename($file);
			$dat['files'][]=$finfo;
		}

		exit(json_encode($dat));

	case 'preview':
		$dat['POST']=$_POST;
		exit(json_encode($dat));
	
	default:
		exit(json_encode(['error'=>'hello?']));
}



/**
 * Split a mbsidv2 patch bank into patches
 * @param  string $filename [description]
 * @return [type]           [description]
 */
function splitBank($filename='',$destination='')
{
	echo __FUNCTION__;
	$size=filesize($filename);
	echo "size=$size";
	
	$f=fopen($filename,"r");
	$contents = fread($f, filesize($filename));
	fclose($f);


	$data = fread($f, 1024);
	var_dump($contents);

}


function patchInfo($filename='')
{
	echo __FUNCTION__."($filename)\n";
	
	$size=filesize($filename);
	echo "<li>size=$size\n";

	//$head=[];
	$f=fopen($filename,"r");
	
	$head = fread($f, 10);//sysex header
		
	$name = fread($f, 16);//Patch Name (16 ASCII characters)

	fclose($f);
	
	echo "<li>head=";
	for($i=0;$i<strlen($head);$i++){
		$b=$head[$i];
		echo strtoupper(bin2hex($b));
		echo ' ';
	}

	echo "<br />";
	echo "<li>name=";
	for($i=0;$i<strlen($name);$i++){
		$b=$name[$i];
		//echo "<li>".chr($b);
		//echo strtoupper(bin2hex($b));
		echo chr($b);
		echo ' ';
	}

}
