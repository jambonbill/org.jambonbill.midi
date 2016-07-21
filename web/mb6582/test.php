<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";


patchInfo('syx/Brass1.syx');

/*
02/a) F0 00 00 7E 4B <device-number> 02 00 <bank> <patch> <1024 bytes of dump data> <checksum> F7
        Write a dump to <patch> in <bank>
        Checksum is 2s complement over the 1024 bytes dump
        The actual patch size is only 512 bytes - the 8bit values are
        divided into low- and high-nibble (low-nibble is sent first),
        therefore 1024 bytes have to be sent
*/

function patchInfo($filename='')
{
	echo __FUNCTION__."($filename)\n";
	
	$size=filesize($filename);
	echo "size=$size\n";

	//$head=[];
	$f=fopen($filename,"r");
	
	$head = fread($f, 10);//sysex header
	$patch = fread($f, 1024);//Patch
	$checksum = fread($f, 1);//CheckSum
	$f7 = fread($f, 1);//F7

	fclose($f);
	
	echo "head=";
	for($i=0;$i<strlen($head);$i++){
		$b=$head[$i];
		echo strtoupper(bin2hex($b));
		echo ' ';
	}

	echo "\n";
	$PATCH=[];
	//$BYTE=[];
	echo "patch=";
	for($i=0;$i<strlen($patch);$i+=2){
		$b1=$patch[$i];
		$b2=$patch[$i+1];
		
		$PATCH[]=$b1+($b2*16);
		echo strtoupper(bin2hex($b1));
		echo strtoupper(bin2hex($b2));
		echo ' ';
	}
	echo "\n";
	
	echo count($PATCH);echo "bytes\n";
	//$PATCH=implode('',$PATCH);//tostring
	for($i=0;$i<count($PATCH);$i++){
		$b=$PATCH[$i];
		echo strtoupper(bin2hex($b));
		echo ' ';	
	}

	echo "\n";
	echo "checksum=".bin2hex($checksum);echo "\n";
	echo "f7=".bin2hex($f7);echo "\n";
}
