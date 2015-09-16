<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-music'></i> MIDI
  <small></small>
  </h1>
</section>


<section class="content">

<div class='row'>
	<div class='col-sm-6'>
	<?php
	$box=new LTE\Box;
	$box->title("Input(s)");
	$box->icon("fa fa-plug");
	$box->id("boxInputs");
	$box->collapsable(true);
	$box->body("<select class='form-control' id=midi_inputs size=3></select>");
	echo $box;
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	$box=new LTE\Box;
	$box->title("Output(s)");
	$box->icon("fa fa-plug");
	$box->id("boxOutputs");
	$box->collapsable(true);
	$box->body("<select class='form-control' id=midi_outputs size=3></select>");
	echo $box;
	?>
	</div>
</div>

<div class='row'>
	<div class='col-sm-12'>
	<?php
	$box=new LTE\Box;
	$box->title("Incoming midi events");
	$box->icon("fa fa-list");
	$box->id("boxIncoming");
	$box->collapsable(true);
	$box->body("<select class='form-control' id=midi_inputs size=5></select>");
	$box->footer("<a href=# class='btn btn-default'>Clear</a>");
	echo $box;
	?>
	</div>
</div>

<hr />
http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

<script type="text/javascript" src='dist/js/midi.js'></script>

<?php
$admin->footer("Midimon");
$admin->end();
