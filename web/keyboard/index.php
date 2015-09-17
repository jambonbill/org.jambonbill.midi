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
  <small></small>
  </h1>
</section>


<section class="content">

<div class='row'>
	<div class='col-md-12'><pre>Use you computer keyboard as a midi keyboard/controller</pre></div>
</div>

<div class='row'>

	<div class='col-sm-6'>
	<?php
	$htm=[];
	$htm[]="<div class='row'>";
	$htm[]="<div class='col-xs-6'>";
	$htm[]="<select class='form-control' id=midiChannel>";
	for($i=0;$i<16;$i++){
		$htm[]="<option value=$i>Channel #".($i+1)."</option>";
	}
	$htm[]="</select>";
	$htm[]="</div>";
	$htm[]="<div class='col-xs-6'>";
	$htm[]="<select class='form-control' id=ocyave>";
	for($i=0;$i<5;$i++){
		$htm[]="<option value=$i>Octave #".($i+1)."</option>";
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
	
	<div class='col-sm-6'>
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

	<div class='col-sm-6'>
	<?php
	// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
	$htm=[];
	
	$htm[]="<div class=row>";
	
	$htm[]="<div class=col-sm-6>";
	$htm[]="<input type=text class='form-control' placeholder='Hit a key !'>";
	$htm[]="</div>";
	
	$htm[]="<div class=col-sm-6>";
	$htm[]="<input type=text class='form-control' placeholder='Keycode'>";
	$htm[]="</div>";
	
	$htm[]="</div>";

	$box=new LTE\Box;
	$box->title("Keyboard mapping");
	$box->icon("fa fa-list");
	$box->id("boxMapping");
	//$box->collapsed(true);
	$box->body($htm);
	echo $box;
	?>
	</div>

</div>


<script type="text/javascript" src='js/keyboard.js'></script>

<?php
$admin->footer("Midimon - keyboard");
$admin->end();
