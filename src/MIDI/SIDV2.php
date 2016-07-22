<?php

namespace MIDI;

class SIDV2
{

    //public $filename;
    //public $data;
    

	public function __construct ()
    {
       
        // Create PDO object
    }
 

    /**
     * Two's complement
     * @param  [type] $bin [description]
     * @return [type]      [description]
     */
    public function twoscomp($bin) {
        $out = "";
        $mode = "init";
        for($x = strlen($bin)-1; $x >= 0; $x--) {
            if ($mode != "init")
                $out = ($bin[$x] == "0" ? "1" : "0").$out;
            else {
                if($bin[$x] == "1") {
                    $out = "1".$out;
                    $mode = "invert";
                }
                else
                    $out = "0".$out;
            }
        }
        return bindec($out);
    }

    public function patchInfo($filename='')
    {
        
        if(!$filename){
            return [];
        }

        $INFO=[];
        $INFO=[];//output

        $size=filesize($filename);
        $INFO['filesize']=$size;

        //$head=[];
        $f=fopen($filename,"r");
    
        $head = fread($f, 10);//sysex header F0 00 00 7E 4B ..
        $patch = fread($f, 1024);//Patch
        $checksum = fread($f, 1);//CheckSum
        $f7 = fread($f, 1);//F7
        fclose($f);
        
        //F0 00 00 7E 4B xx
        for($i=0;$i<strlen($head);$i++){
            $b=$head[$i];
            //echo strtoupper(bin2hex($b));
            //echo ' ';
        }
        
        //$INFO['head']=ord($head[5]);
        $INFO['device-number']=ord($head[5]);
        $INFO['bank']=ord($head[8]);
        $INFO['patch']=ord($head[9]);
        //echo "\n";
    
        $PATCH=[];
        $CS=0;
        for($i=0;$i<strlen($patch);$i+=2){
            
            $low= ord($patch[$i]);
            $high= ord($patch[$i+1]);
            $value=$low+$high*16;
            
            $CS+=$low;
            $CS+=$high;
            
            $PATCH[]=$value;
        }
    
        $CS=$CS%256;
        //$CS=-$CS;//complemn
        $INFO['cs']=dechex($this->twoscomp(decbin($CS)));

        $name=[];
        for ($i=0;$i<16;$i++) {
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
    

        // Filters //
        //$INFO['filters']=$KNOBS;



        $INFO["checksum"]=bin2hex($checksum);

        //echo "f7=".bin2hex($f7);echo "\n";
        $INFO['f7']=bin2hex($f7);
        
        return $INFO;
        //return $INFO;
    }


    public function patchBinary($filename='')
    {
        
        if(!$filename){
            return [];
        }

        return file_get_contents($filename);
    }
}
