<?php
// MIDI Control Changes
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
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

<link href="css/bootstrap-colorselector.css" rel="stylesheet" />
<script type="text/javascript" src='js/keymap.js'></script>
<script type="text/javascript" src='js/cc.js'></script>
<script type="text/javascript" src='js/bootstrap-colorselector.js'></script>
<?php
include "modal_configs.php";
include "modal_widget.php";
$admin->footer("Jambonbill MIDI world organisation");
$admin->end();
