<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("MIDI Keyboard");
//$admin->description('Use you keyboard as a midi keyboard/controller');
echo $admin;

?>
<div class="content-wrapper">
	<section class="container">
	  <h1>MIDI Keyboard</h1>
	  <hr />
	</section>

	<section class="container">


		<div class='row'>

			<div class='col-sm-12'>
			<?php
			require "midi_channels.php";
			?>
			</div>

			<div class='col-sm-6'>
			<?php
			require "box_keyboard.php";
			?>
			</div>
			<div class='col-sm-6'>
			<?php
			require "box_messages.php";
			?>
			</div>
		</div>

		<div class='row'>
			<div class='col-sm-6'>
			<?php
			//require "box_keymap.php";
			?>
			</div>
		</div>
	</section>
</div>
<script type="text/javascript" src='js/keymap.js'></script>
<script type="text/javascript" src='js/keyboard.js'></script>

<?php
require 'modal_midi_output.php';
$admin->footer("Midimon - keyboard");
$admin->end();