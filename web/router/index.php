<?php
// Midi Router
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";
//require __DIR__."/../../src/MIDI/midi.class.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("MIDI router");
echo $admin;
?>

<div class="content-wrapper">

	<section class="container">
		<h1>MIDI Router</h1>
	</section>

	<section class="container">
		<div class=row>
			<div class='col-md-12'>
				<?php
				require "box_setup.php";
				require "box_routes.php";
				?>
			</div>
		</div>
	</section>

</div>

<script type="text/javascript" src='js/router.js'></script>
<?php
$admin->footer("pouet");
$admin->end();