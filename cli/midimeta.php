<?php

require('./classes/midi.class.php');

echo "<pre>";

$file='mid/daftpunk.mid';

echo "<li>file=$file";

$midi = new Midi();
$midi->importMid($file);


$trackcount=$midi->getTrackCount();
echo "<li>trackcount=$trackcount";

$tracks=$midi->getTracks();
print_r($tracks);

//$names=$midi->getTrackNames();
//echo "TrackNames=";print_r($names);

$track = $midi->getTrack(0);

// list of meta events that we are interested in (adjust!)
$texttypes = array('Text','Copyright','TrkName','InstrName','Lyric','Marker','Cue');

$nothing = 1;
foreach ($track as $msgStr){
	$msg = explode(' ',$msgStr);
	if ($msg[1]=='Meta'&&in_array($msg[2],$texttypes)){
		echo $msg[2].': '.substr($msgStr,strpos($msgStr,'"'))."\n";
		$nothing = 0;
	}
}

if ($nothing) {
	echo 'No events found!';
}
