<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
echo $admin;
?>
<div class="content-wrapper">
	<section class="container">
	  <h1>MIDI Monitor
	  <small></small>
	  </h1>
	</section>

	<section class="container">

		<div class='row'>
			<div class='col-sm-5'>
			<?php
			require "box_inputs.php";
			require "box_filter.php";
			?>
			</div>
			<div class='col-sm-7'>
			<?php
			require "box_logs.php";
			?>
			</div>
		</div>
	</section>
</div>

<script type="text/javascript" src='js/monitor.js'></script>
<?php
//$admin->footer("Midimon");
$admin->end();