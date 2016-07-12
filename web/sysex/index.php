<?php
// MIDI SYSEX
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI Sysex");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-terminal'></i> MIDI Sysex
  </h1>
</section>


<section class="content">

<div class='row'>

	<div class='col-sm-6'>
	<?php
	include "box_inputs.php";
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	include "box_outputs.php";
	?>
	</div>
	
</div>

<div class='row'>

	<div class='col-sm-6'>
	<?php
	include "box_receive.php";
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	include "box_send.php";
	?>
	</div>

</div>


<script type="text/javascript" src='js/sysex.js'></script>

<?php
$admin->footer("Midimon - Sysex");
$admin->end();
