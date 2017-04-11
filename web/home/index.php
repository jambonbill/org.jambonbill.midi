<?php
// test.php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$admin = new LTE\AdminLte2();
$admin->title("midi.jambonbill.org");
echo $admin;
?>
<section class="container">
<h1>midi.jambonbill.org</h1>
Here is a collection of web 'apps' that i wrote to help me work with the midi protocol.<br />
After many years, i was tired of using softwares designed for specific equipments or operating systems.<br />
Enjoy !
