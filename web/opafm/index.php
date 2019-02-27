<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("OPA FM Shield");

require "META.php";

echo $admin;
?>

<section class="container">
  <h1>OPA.FM Shield Patch editor
  </h1>
</section>

<section class="container">

	<div class='row'>

		<div class='col-sm-12'>
		<?php
		require "box_patch.php";
		?>
		</div>

	</div>

	<div class='row'>
		<?php
		for($OP=1;$OP<=4;$OP++) {
			echo '<div class="col-md-6">';
			include "box_operator.php";
			echo '</div>';
		}
		?>
	</div>

	<div class='row'>
		<div class='col-sm-12'>
		<?php
		require "box_actions.php";
		?>
		</div>
	</div>

</section>

<style type="text/css">
input[type=range]{cursor:pointer;}
</style>
<script type="text/javascript" src='js/keymap.js'></script>
<script type="text/javascript" src='js/opafm.js'></script>
<?php
require "modal_algorithm.php";
require "modal_loadjson.php";
require "modal_patch.php";
$admin->end();