<?php
// test.php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI");
echo $admin;
?>
<section class="container">
<?php
$midi = new Midi();

$files=glob(__DIR__."/../../midifiles/*.mid");
shuffle($files);

$file=$files[0];

$midi->importMid($file);
$track = $midi->getTrack(0);

echo "<h1>".basename($file)."</h1>\n";
echo "<pre>";

$tempo=$midi->getTempo();
$bpm=$midi->getBpm();//returns tempo as beats per minute (0 if tempo not set). 
$timebase=$midi->getTimebase();//returns timebase value. 
$trackCount=$midi->getTrackCount();//returns number of tracks. 
$duration=$midi->getDuration();//in sec

echo "tempo=$tempo\n";
echo "BPM=$bpm\n";
echo "duration=$duration sec\n";
echo "timebase=$timebase\n";
echo "trackCount=$trackCount\n";
//print_r($track);
