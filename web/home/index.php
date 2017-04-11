<?php
// test.php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$admin = new LTE\AdminLte2();
$admin->title("midi.jambonbill.org");

$META=[];//http://ogp.me

// TWITTER META
//$META[]=['name'=>"twitter:card",    'content'=>'summary'];
$META[]=['name'=>"twitter:card",    'content'=>'summary_large_image'];
$META[]=['name'=>"twitter:site",    'content'=>"@jambonbill"];
$META[]=['name'=>"twitter:title",   'content'=>"midi.jambonbill.org"];
$META[]=['name'=>"twitter:description", 'content'=>'MIDI tools and stuff'];

$META[]=['name'=>"twitter:image",   'content'=>'http://midi.jambonbill.org/dist/img/midi.gif'];

// FACEBOOK META
$META[]=['property'=>'og:url',      'content'=>'http://midi.jambonbill.org'];
$META[]=['property'=>"og:type",     'content'=>"article"];
$META[]=['property'=>"og:title",    'content'=>"midi.jambonbill.org"];
$META[]=['property'=>"og:description", 'content'=>'MIDI tools and stuff'];
$META[]=['property'=>"og:image",    'content'=>'http://midi.jambonbill.org/dist/img/midi.gif'];
$META[]=['property'=>"og:locale",   'content'=>"en_US"];

// LAW DESCRIPTION
$META[]=['name'=>"description",   'content'=>'MIDI tools and stuff'];

//
$admin->meta($META);//Set Meta's


echo $admin;
?>
<section class="container">
<h1>midi.jambonbill.org</h1>
<!--
Here is a collection of web 'apps' that i wrote to help me work with the midi protocol.<br />
After many years, i was tired of using crappy softwares designed for specific equipments or operating systems.<br />
Enjoy !
-->

<div class=row>
	<div class="col-sm-6">
	<?php
	$box=new LTE\Box;
	$box->title('Available input(s)');
	$box->id('boxInputs');
	$box->body();
	$box->footer('<a href=#btn id=btnRefresh1 class="btn btn-default">refresh</a>');
	//$box->collapsable(true);
	$box->loading(1);
	echo $box;//Hello, this is a snippet.
	?>
	</div>

	<div class="col-sm-6">
	<?php
	$box=new LTE\Box;
	$box->id('boxOutputs');
	$box->title('Available output(s)');
	$box->body();
	$box->footer('<a href=#btn id=btnRefresh2 class="btn btn-default">refresh</a>');
	//$box->collapsable(true);
	$box->loading(1);
	echo $box;//Hello, this is a snippet.
	?>
	</div>

</div>

<script type="text/javascript" src="js/home.js"></script>