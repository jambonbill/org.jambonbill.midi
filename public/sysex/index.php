<?php
// MIDI SYSEX
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
echo $admin;

?>

<div class="content-wrapper">

	<section class="content-header">
	  <h1><i class='fa fa-terminal'></i> Sysex
	  </h1>
	</section>

	<section class="content">

		<div class='row'>

			<div class='col-md-6'>
			<?php
			require "box_send.php";
			?>
			</div>

			<div class='col-md-6'>
			<?php
			require "box_receive.php";
			?>
			</div>

		</div>
	</section>

</div>

<script type="text/javascript" src='js/sysex.js'></script>

<?php
require "modal_sysex.php";
$admin->end();
