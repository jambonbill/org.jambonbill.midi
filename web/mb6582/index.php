<?php
// MIDI SYSEX
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MB6582");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-terminal'></i> MB6582 Patches
  </h1>
</section>


<section class="content">

<div class='row'>

	<div class='col-sm-6'>
	<?php
	include "box_files.php";
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	include "box_patch.php";
	?>
	</div>
	
</div>

<div class='row'>

	<div class='col-sm-6'>
	<?php
	//include "box_receive.php";
	?>
	</div>

	<div class='col-sm-6'>
	<?php
	//include "box_send.php";
	?>
	</div>

</div>


<script type="text/javascript" src='js/main.js'></script>

<?php
$admin->footer("Midimon - Sysex");
$admin->end();
