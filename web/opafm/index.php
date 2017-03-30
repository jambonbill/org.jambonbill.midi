<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("OPA FM Shield");
include "META.php";
echo $admin;
?>
<section class="content-header">
  <h1><i class='fa fa-cog'></i> OPA FM Shield Editor
  <small><a href='http://fredslab.net/opa/'>http://fredslab.net/opa/</a></small>
  </h1>
</section>

<section class="content">

<div class='row'>
	<div class='col-sm-12'>
	<?php
	include "box_algorithm.php";
	?>
	</div>
</div>

<div class='row'>

	<?php
	for($OP=1;$OP<=4;$OP++) {
		echo '<div class="col-sm-5">';
		include "box_operator.php";
		echo '</div>';
	}

	?>
	</div>
</div>

<script type="text/javascript" src='js/opafm.js'></script>
