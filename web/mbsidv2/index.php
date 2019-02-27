<?php
// MIDI SYSEX
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("MB6582");
echo $admin;
?>
<div class="content-wrapper">
	<section class="container">
	  <h1><i class='fa fa-terminal'></i> MBSIDV2 Patches
	  <small><a href='http://midibox.org/forums/topic/15119-midibox-sid-v2-patches/?page=2'>http://midibox.org/forums/topic/15119-midibox-sid-v2-patches/?page=2</a></small>
	  </h1>
	</section>


	<section class="container">

	<div class='row'>

		<div class='col-sm-12'>
		<?php
		include "box_controls.php";
		?>
		</div>

		<div class='col-sm-12'>
		<?php
		include "box_patches.php";
		include "modal_patch.php";
		?>
		</div>

	</div>

</section>
</div>

<script type="text/javascript" src='js/main.js'></script>
<script type="text/javascript" src='js/sidv2.js'></script>

<?php
$admin->footer("Midimon - Sysex");
$admin->end();
