<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$dat=[];
switch($_POST['do']){
	
	case 'browse':
		
		$f=glob("../../midifiles/*.mid");
		
		$midi = new Midi();
		
		foreach($f as $file){
			
			$midi->importMid($file);
			
			$f=[];
			$f['name']=basename($file);
			$f['size']=filesize($file);
			
			// get midifile info //
			$f['bpm']=$midi->getBpm();//returns tempo as beats per minute (0 if tempo not set). 
			$f['timebase']=$midi->getTimebase();//returns timebase value. 
			$f['trackCount']=$midi->getTrackCount();//returns number of tracks. 

			$dat['files'][]=$f;
		}
		
		exit(json_encode($dat));
	
	
	case 'fileInfo':

		$dat['post']=$_POST;
		
		$midi = new Midi();
		$midi->importMid(__DIR__."/../../midifiles/".$_POST['filename']);
		//$track = $midi->getTrack(0);
		
		$dat['bpm']=$midi->getBpm();//returns tempo as beats per minute (0 if tempo not set). 
		$dat['timebase']=$midi->getTimebase();//returns timebase value. 
		$dat['trackCount']=$midi->getTrackCount();//returns number of tracks. 
		
		$track = $midi->getTrack(0);

		// list of meta events that we are interested in (adjust!)
		//$texttypes = array('Text','Copyright','TrkName','InstrName','Lyric','Marker','Cue');
		$texttypes = array('TrkName');

		foreach ($track as $msgStr){
			$msg = explode(' ',$msgStr);
			if ($msg[1]=='Meta'&&$msg[2]=='TrkName') {
				//print_r($msgStr);//ex : 0 Meta TrkName "A Message to Rudy by THE SPECIALS"
				//$dat['meta'][]=$msg[2].': '.substr($msgStr,strpos($msgStr,'"'));
				$dat['trackName']=trim(explode('TrkName',$msgStr)[1]);
			}
		}
		

		exit(json_encode($dat));

	
	default:
		$dat=['error'=>'hello?'];
		$dat['post']=$_POST;
		exit(json_encode($dat));
}
