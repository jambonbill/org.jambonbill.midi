<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2;
$admin->title("MIDI monitor");
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
	<?php include "box_inputs.php";?>
	</div>

	<div class='col-sm-6'>
	<?php include "box_filter.php";?>
	</div>

</div>

<div class='row'>
	<div class='col-sm-12'>
	<?php include "box_logs.php";?>
	</div>
</div>

<script type="text/javascript" src='js/monitor.js'></script>
<?php
$admin->footer("Midimon");
$admin->end();
