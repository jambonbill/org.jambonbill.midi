<?php
// Midi Router
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI router");
echo $admin;
?>
<section class="container">

<h1>MIDI Router</h1>

<div class=row>
	<div class='col-md-12'>
		<?php
		include "box_setup.php";
		include "box_routes.php";
		?>
	</div>
</div>

<script type="text/javascript" src='js/router.js'></script>