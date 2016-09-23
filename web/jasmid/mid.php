<?php
// Return midi file //
session_start();

require __DIR__."/../../vendor/autoload.php";

if(!isset($_GET['mid'])){
	exit;
}

$filename=__DIR__."/../../midifiles/".basename($_GET['mid']);

if (is_file($filename)) {
	readfile ( $filename );
}else{
	exit("file not found");
}
		