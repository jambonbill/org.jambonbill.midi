<?php
// MIDI Control Changes
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Control changes");
//include "custom_menu.php";
echo $admin;
//http://anthonyterrien.com/demo/knob/
?>
<section class="content-header">
  <h1><i class='fa fa-terminal'></i> Control changes
  </h1>

</section>


<section class="content">

<div class='row'>
	<div class='col-sm-12'>
	<?php
	include "box_setup.php";
	?>
	</div>
</div>

<div class='row' id=ccboxes>

	<div class='col-sm-3 connectedSortable ui-sortable'>
	Hello
	<?php
	//include "box_cc.php";
	?>
	</div>


</div>


<script type="text/javascript" src='js/keymap.js'></script>
<script type="text/javascript" src='js/cc.js'></script>

<?php
include "modal_widget.php";
$admin->footer("Jambonbill MIDI world organisation");
$admin->end();
