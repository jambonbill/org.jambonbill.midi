<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("OPA FM Shield");
include "META.php";
echo $admin;
?>
<section class="content-header">
  <h1><i class='fa fa-cog'></i> OPA FM Shield Editor
  <small><a href='http://fredslab.net/opa/'>http://fredslab.net/opa/</a> - <a href='https://raw.githubusercontent.com/jambonbill/MIDIUSB-OPA/master/CC_Implementation.txt'>CC_Implementation</a></small>
  </h1>
</section>

<section class="content">

	<div class='row'>
		<div class='col-sm-12'>
		<?php
		include "box_patch.php";
		include "modal_loadjson.php";
		//include "modal_patch.php";
		?>
		</div>
	</div>

	<div class='row'>
		<?php
		for($OP=1;$OP<=4;$OP++) {
			echo '<div class="col-sm-6">';
			include "box_operator.php";
			echo '</div>';
		}
		?>
	</div>

	<div class='row'>
		<div class='col-sm-12'>
		<?php
		include "box_actions.php";
		?>
		</div>
	</div>

</section>

<style type="text/css">
input[type=range]{cursor:pointer;}
</style>
<script type="text/javascript" src='js/opafm.js'></script>
