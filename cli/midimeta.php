<?php

require __DIR__."/../vendor/autoload.php";
require __DIR__."/../src/MIDI/midi.class.php";

$files=glob('source/*.mid');
shuffle($files);
$file=$files[0];

echo "file=$file\n";
echo "filesize=".filesize($file)."\n";
echo "md5=".md5_file($file)."\n";

$midi = new Midi();
$midi->importMid($file);

$BPM=$midi->getBpm();
echo "BPM=$BPM\n";

$timeBase=$midi->getTimebase();
echo "timeBase=$timeBase (ppqn)\n";

$trackcount=$midi->getTrackCount();
echo "trackcount=$trackcount\n";

$duration=$midi->getDuration();
echo "duration=$duration\n";

$tracks=$midi->getTracks();
//print_r($tracks);

//$names=$midi->getTrackNames();
//echo "TrackNames=";print_r($names);

$STATS=[];
$TEXTS=[];
$TRACKNAMES=[];
$LYRICS=[];
$INFO='';

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
			$STR=trim(substr($msgStr,strpos($msgStr,'"')));
			//echo $msg[2].': '.$STR."\n";
			$nothing = 0;
			$INFO.=$msg[2].': '.$STR."\n";
		}
	}

	if ($nothing) {
		//echo 'No events found!';
	}
}

echo "INFO=".$INFO."\n";
echo strlen($INFO)." bytes info\n";
//echo "STATS ";print_r($STATS);

//rename($file, "../midifiles/$foldes/$md5");
//updateDb//

$sql="INSERT INTO midifiles m_filename, m_filesize, m_copyright, m_md5, m_tracks, m_ppqn, m_bpm, m_duration, m_metadata, m_updated ";
$sql="VALUES ();";

echo "$sql\n";
