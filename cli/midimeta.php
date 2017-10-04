<?php

require __DIR__."/../vendor/autoload.php";
require __DIR__."/../src/MIDI/midi.class.php";

$files=glob('mid/*.mid');
shuffle($files);
$file=$files[0];

echo "file=$file\n";
echo "md5=".md5_file($file)."\n";

$midi = new Midi();
$midi->importMid($file);


$trackcount=$midi->getTrackCount();
echo "trackcount=$trackcount\n";

$tracks=$midi->getTracks();
//print_r($tracks);

//$names=$midi->getTrackNames();
//echo "TrackNames=";print_r($names);

$STATS=[];
$TEXTS=[];
$TRACKNAMES=[];
$LYRICS=[];

$texttypes = array('Text','Copyright','TrkName','InstrName','Lyric','Marker','Cue');// list of meta events

for($i=0;$i<$trackcount;$i++){

	//echo "TRACK[$i]\n";

	$track = $midi->getTrack($i);

	$nothing = 1;
	foreach ($track as $msgStr){
		$msg = explode(' ',$msgStr);

		if ($msg[1]=='Meta'&&!in_array($msg[2],$texttypes))continue;

		@$STATS[$msg[2]]++;

		if ($msg[1]=='Meta'){
			echo $msg[2].': '.substr($msgStr,strpos($msgStr,'"'))."\n";
			$nothing = 0;
		}
	}

	if ($nothing) {
		echo 'No events found!';
	}

}

print_r($STATS);
