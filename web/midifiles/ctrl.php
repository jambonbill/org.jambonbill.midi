<?php
// Controller //
header('Content-Type: application/json');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$dat=[];
switch($_POST['do']){

	case 'browse':

		//dbsearch
		exit(json_encode($dat));



	case 'wget':
		$dat['post']=$_POST;
		//$file = 'http://www.domain.com/somefile.jpg';
		$dat['headers'] = @get_headers(trim($_POST['url']));

		if (!$dat['headers'] || $dat['headers'][0] == 'HTTP/1.1 404 Not Found') {
		    $dat['error']=$file_headers[0];
		} else {
		    if (file_put_contents("/tmp/Tmpmid.mid", fopen(trim($_POST['url']), 'r'))) {
		    	$dat['msg']="ok!";
		    	$midi = new Midi();
		    	$midi->importMid("/tmp/Tmpmid.mid");
		    	$dat['bpm']=$midi->getBpm();//returns tempo as beats per minute (0 if tempo not set).
				$dat['timebase']=$midi->getTimebase();//returns timebase value.
				$dat['trackCount']=$midi->getTrackCount();//returns number of tracks.
				$dat['track0'] = $midi->getTrack(0);
		    } else {
		    	$dat['error']="Copy error";
		    }
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
				$dat['trackName']=trim(explode('TrkName',$msgStr)[1]);
			}
		}


		exit(json_encode($dat));


	default:
		$dat=['error'=>'hello?'];
		$dat['post']=$_POST;
		exit(json_encode($dat));
}
