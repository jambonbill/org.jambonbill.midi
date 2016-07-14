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
	include "box_outputs.php";
	?>
	</div>

	
	<div class='col-sm-6'>
	<?php
	include "box_keyboard.php";
	?>
	</div>

	
	
</div>

<div class='row'>
	


	<div class='col-sm-6'>
	<?php
	include "box_keymap.php";
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	include "box_messages.php";
	?>
	</div>

</div>


<script type="text/javascript" src='js/keyboard.js'></script>

<?php
$admin->footer("Midimon - keyboard");
$admin->end();
