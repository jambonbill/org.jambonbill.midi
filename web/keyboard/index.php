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
  <h1><i class='fa fa-keyboard-o'></i> MIDI Keyboard
  <small>Use you keyboard as a midi keyboard/controller</small>
  </h1>
</section>


<section class="content">

<div class='row'>

	<div class='col-sm-6'>
	<?php
	$box=new LTE\Box;
	$box->title("Output(s)");
	$box->icon("fa fa-plug");
	$box->id("boxOutputs");
	$box->collapsable(true);
	$box->body("<select class='form-control' id=midi_outputs size=4></select>");
	echo $box;
	?>
	</div>

	
	<div class='col-sm-6'>
	<?php
	$htm=[];
	$htm[]="<div class='row'>";
	$htm[]="<div class='col-xs-6'>";
	$htm[]="<select class='form-control' id=midiChannel disabled=disabled>";
	for($i=0;$i<16;$i++){
		$htm[]="<option value=$i>Channel #".($i+1)."</option>";
	}
	$htm[]="</select>";
	$htm[]="</div>";
	$htm[]="<div class='col-xs-6'>";
	$htm[]="<select class='form-control' id=octave disabled=disabled>";
	for($i=0;$i<5;$i++){
		$htm[]="<option value='$i'>Octave #".($i+1)."</option>";
	}
	$htm[]="</select>";
	$htm[]="</div>";
	$htm[]="</div>";
	$box=new LTE\Box;
	$box->title("Keyboard");
	$box->icon("fa fa-keyboard-o");
	$box->id("boxKeyboard");
	$box->collapsable(true);
	$box->body($htm);
	$box->footer("<a href=#list class='btn btn-default'>Test</a> <a href=#list class='btn btn-default'><i class='fa fa-times'></i> Midi panic</a>");
	echo $box;
	?>
	</div>

	
	
</div>

<div class='row'>
	


	<div class='col-sm-6'>
	<?php
	// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	$htm=[];
	
	$htm[]="<div class=row>";
	
	$htm[]="<div class=col-sm-6>";
	$htm[]="<input type=text class='form-control' id='keyname' placeholder='Hit a key !'>";
	$htm[]="</div>";
	
	$htm[]="<div class=col-sm-6>";
	$htm[]="<input type=text class='form-control' id='keycode' placeholder='Keycode' readonly>";
	$htm[]="</div>";
	
	$htm[]="</div>";

	$box=new LTE\Box;
	$box->title("Keyboard mapping");
	$box->icon("fa fa-cogs");
	$box->id("boxMapping");
	//$box->collapsed(true);
	$box->body($htm);
	$box->footer("<a href=#btn id=btnMapping class='btn btn-default'><i class='fa fa-list'></i> Mapping</a>");
	echo $box;
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	$box=new LTE\Box;
	$box->title("Messages");
	$box->icon("fa fa-terminal");
	$box->id("boxLog");
	$box->collapsable(true);
	$box->body("Select midi output");
	echo $box;
	?>
	</div>

</div>


<script type="text/javascript" src='js/keyboard.js'></script>

<?php
$admin->footer("Midimon - keyboard");
$admin->end();
