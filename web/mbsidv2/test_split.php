<?php
// test //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";


bankSplit('syx/bank/v2_vintage_bank.syx');

echo "\ndone\n";

function bankSplit($filename='')
{
	echo __FUNCTION__."($filename)\n";
	
	$PATCHES=[];

	$size=filesize($filename);
	echo "size=$size\n";

	//$head=[];
	$f=fopen($filename,"r");
	while($DAT=fread($f, 1036)){
		$PATCHES[] = $DAT;//	
	}
	fclose($f);
	


	echo count($PATCHES) . " patches";
	for($i=0;$i<count($PATCHES);$i++){
		$DAT=$PATCHES[$i];
		$dest=sprintf("./syx/tmp/patch%03s.syx",$i);
		$f=fopen($dest,"w+");
		fwrite($f,$DAT,1036);	
		fclose($f);	
		chmod($dest, 0777);  // octal; correct value of mode
		echo "$dest written\n";
	}
	return true;
}
