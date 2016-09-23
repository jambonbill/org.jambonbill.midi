<?php
// JasMid
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Jasmid");
echo $admin;
?>
<link href="./css/main.css" rel="stylesheet" type="text/css" />
<section class="content-header">
  <h1><i class='fa fa-music'></i> Jasmid
  <small><a href=# id=btnBrowse>Browse</a></small>
  </h1>
</section>

<section class="content">

<div class='row'>
	<div class='col-sm-6'>
	<?php
	//include "box_file.php";
	//include "box_files.php";
	include "box_tracks.php";
	?>
	</div>

	<div class='col-sm-6'>
	<?php 
	//include "box_filter.php";
	include "box_track.php";
	include "box_preview.php";
	?>
	</div>

</div>

<div class='row'>
	<div class='col-sm-12'>
	<?php 
	include "box_canvas.php";
	?>
	</div>
</div>

<script type="text/javascript" src="js/stream.js"></script>
<script type="text/javascript" src="js/midifile.js"></script>
<script type="text/javascript" src="js/replayer.js"></script>
<script type="text/javascript" src="js/synth.js"></script>
<script type="text/javascript" src="js/audio.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/canvas.js"></script>

<?php
$modal=new LTE\Modal;
$modal->title("Browse");
echo $modal;

$admin->footer("<a href='https://github.com/gasman/jasmid'>https://github.com/gasman/jasmid</a>");
$admin->end();
