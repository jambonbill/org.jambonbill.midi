<?php
// PATCH
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

echo "<pre>";

$files=glob("xml/*.xml");

$f=$files[0];
$xml=simplexml_load_file($f);

if ($xml === false) {

    echo "Failed loading XML: ";

    foreach(libxml_get_errors() as $error) {
        echo "<br>", $error->message;
    }

} else {
    print_r($xml);
}

