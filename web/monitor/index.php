<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-list'></i> MIDI Monitor
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

</div>

<div class='row'>
	<div class='col-sm-12'>
	<?php
	$btn=[];
	$btn[]="<a href=#btn id=btnClear class='btn btn-default pull-right'>Clear</a>";
	$btn[]="<a href=#btn id=btnFilter class='btn btn-default'><i class='fa fa-user'></i> Filter</a>";
	$btn[]="<a href=#btn id=btnRecord class='btn btn-default'><i class='fa fa-user'></i> Record</a>";
	$box=new LTE\Box;
	$box->title("Incoming midi events");
	$box->icon("fa fa-list");
	$box->id("boxIncoming");
	$box->collapsable(true);
	$box->body("<pre>Waiting...</pre>");
	$box->footer($btn);
	echo $box;
	?>
	</div>
</div>

<hr />
http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

<script type="text/javascript" src='js/monitor.js'></script>

<?php
$admin->footer("Midimon");
$admin->end();
