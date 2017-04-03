<?php
// Midifile
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Midifile");
echo $admin;
?>
<section class="content-header">
  <h1><i class='fa fa-file-o'></i> Midifile
  <small></small>
  </h1>
</section>

<section class="content">

<div class='row'>
	<div class='col-sm-12'>
	<?php
	include "box_file.php";
	?>
	</div>
</div>

<script type="text/javascript" src="js/midifile.js"></script>

<?php
$admin->end();
