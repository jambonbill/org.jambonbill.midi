<?php
// MIDI Control Changes
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Control changes");
//include "custom_menu.php";
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-terminal'></i> Control changes
  </h1>
</section>


<section class="content">

<div class='row'>

	<div class='col-sm-3'>
	<?php
	include "box_cc.php";
	?>
	</div>

	<div class='col-sm-3'>
	<?php
	include "box_cc.php";
	?>
	</div>

	<div class='col-sm-3'>
	<?php
	include "box_cc.php";
	?>
	</div>

	<div class='col-sm-3'>
	<?php
	include "box_cc.php";
	?>
	</div>

</div>


<script type="text/javascript" src='js/cc.js'></script>

<?php
$admin->footer("Jambonbill world organisation");
$admin->end();
