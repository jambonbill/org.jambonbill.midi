<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";

$SIDV2=new MIDI\SIDV2;

$NFO=$SID->patchInfo("syx/patch034.syx");
print_r($NFO);
exit();

$f=glob("syx/*.syx");
shuffle($f);
$NFO=patchInfo($f[0]);
print_r($NFO);
//patchInfo("syx/patch034.syx");

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
	//echo __FUNCTION__."($filename)\n";
	
	$INFO=[];//output

	$size=filesize($filename);
	echo "size=$size\n";

	//$head=[];
	$f=fopen($filename,"r");
	
	$head = fread($f, 10);//sysex header
	$patch = fread($f, 1024);//Patch
	$checksum = fread($f, 1);//CheckSum
	$f7 = fread($f, 1);//F7

	fclose($f);
	
	// F0 00 00 7E 4B
	for($i=0;$i<strlen($head);$i++){
		$b=$head[$i];
		echo strtoupper(bin2hex($b));
		echo ' ';
	}
	
	$INFO['device-number']=ord($head[5]);
	$INFO['bank']=ord($head[8]);
	$INFO['patch']=ord($head[9]);
	//echo "\n";
	
	$PATCH=[];
	for($i=0;$i<strlen($patch);$i+=2){
		$b1=$patch[$i];
		$b2=$patch[$i+1];
		//$value=bindec($b1)+(bindec($b2)*16);
		//echo 'lo:'.strtoupper(bin2hex($b1));
		///echo ' - hi:'.strtoupper(bin2hex($b2));
		//echo "\n";
		$low= ord($b1);
		$high= ord($b2);
		$value=$low+$high*16;
		//echo $value;echo ' ';
		$PATCH[]=$value;
	}
	//echo "\n";
	
	//show patch as hex
	/*
	for($i=0;$i<count($PATCH);$i++){
		$b=$PATCH[$i];
		echo chr($b);
	}
	*/
	
	

	
	$name=[];
	for($i=0;$i<16;$i++){
		$name[]=chr($PATCH[$i]);
	}
	$INFO['name']=trim(implode('',$name));

	
	$INFO['engine']=ord($PATCH[0x010]) & 0x0f;//0=Lead, 1=Bassline, 2=Drum, 3=Multi
	
	$INFO['extSwitch']=$PATCH[0x014];// | [7:0] External Switches on/off

	$KNOBS=[];
	for($i=0;$i<8;$i++){
		/*
		      | Knob #1 (Modulation Wheel)
		0x018 | [7:0] Parameter Assignment #1
		0x019 | [7:0] Parameter Assignment #2
		0x01a | [7:0] Initial Value
		0x01b | [7:0] Min. Value
		0x01c | [7:0] Max. Value
		 */
		$addr=0x018+($i*5);
		$P1=$PATCH[$addr];
		$P2=$PATCH[$addr+1];
		$INI=$PATCH[$addr+2];
		$MIN=$PATCH[$addr+3];
		$MAX=$PATCH[$addr+4];
		$KNOBS[]=[$P1,$P2,$INI,$MIN,$MAX];
	}
	$INFO['knobs']=$KNOBS;
	//print_r($KNOBS);

	
	//echo "engine=".$engine;echo "\n";//lead=48, bassline=49, drum=50 multi=51 ()
	//echo "engine=".ord($engine);echo "\n";//lead=48, bassline=49, drum=50 multi=51 ()

	$INFO["checksum"]=bin2hex($checksum);
	$INFO["checksum_calc"]=checksum($patch);
	//echo "f7=".bin2hex($f7);echo "\n";
	$INFO['f7']=bin2hex($f7);
	return $INFO;
}
