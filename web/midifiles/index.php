<?php
// JasMid
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Midifiles");
echo $admin;
?>
<section class="content-header">
  <h1><i class='fa fa-list'></i> Midifiles
  <small>count files</small>
  </h1>
</section>

<section class="content">

<div class='row'>
	<div class='col-sm-12'>
	<?php
	include "box_filter.php";
	include "box_files.php";
	?>
	</div>

</div>

<script type="text/javascript" src="js/main.js"></script>

<?php
include "modal_upload.php";
include "modal_file.php";
//$admin->footer("<a href='https://github.com/gasman/jasmid'>https://github.com/gasman/jasmid</a>");
$admin->end();
