<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI Keyboard");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-music'></i> MIDI Keyboard
  <small></small>
  </h1>
</section>


<section class="content">

<div class='row'>
	<div class='col-md-12'><pre>Use you computer keyboard as a midi keyboard</pre></div>
</div>

<div class='row'>

	<div class='col-sm-6'>
	<?php
	$htm=[];
	$htm[]="<select class='form-control'>";
	$htm[]="<option value=''>Select midi channel</option>";
	for($i=0;$i<16;$i++){
		$htm[]="<option value=$i>Channel #".($i+1)."</option>";
	}
	$htm[]="</select>";

	$box=new LTE\Box;
	$box->title("Keyboard");
	$box->icon("fa fa-keyboard-o");
	$box->id("boxKeyboard");
	$box->collapsable(true);
	$box->body($htm);
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
	$box->title("Log");
	$box->icon("fa fa-list");
	$box->id("boxLog");
	$box->collapsable(true);
	$box->body("logs...");
	echo $box;
	?>
	</div>

</div>

<script type="text/javascript" src='js/keyboard.js'></script>

<?php
$admin->footer("Midimon - keyboard");
$admin->end();
