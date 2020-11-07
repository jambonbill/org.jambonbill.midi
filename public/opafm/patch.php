<?php
// PATCH
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

echo "<pre>";

$files=glob("xml/*.xml");

$f=$files[0];
echo patchName($f);


function patch($filename='') {

	$xml=simplexml_load_file($filename);

	if ($xml === false) {
		echo "Failed loading XML: ";
    	foreach(libxml_get_errors() as $error) {
        	echo "<br>", $error->message;
    	}
    	return;
	}
	print_r($xml);
	return trim($xml->name);
}