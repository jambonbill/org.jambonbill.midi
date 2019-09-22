<?php
// MIDI
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
echo $admin;
?>
<div class="content-wrapper">
	<section class="container">
	  <h1>MIDIFile player
	  <small></small>
	  </h1>
	</section>

	<section class="container">

		<div class='row'>
			<div class='col-md-6'>
			<?php
			//<button class="btn btn-sm">Load file</button>
			require "box_file.php";
			?>
			</div>
			<div class='col-md-6'>
			<?php
			require "box_outputs.php";
			?>
			</div>
		</div>
	</section>
</div>

<script type="text/javascript" src='js/midiplayer.min.js'></script>
<script type="text/javascript" src='js/songs.js'></script>
<script type="text/javascript" src='js/player.js'></script>
<script type="text/javascript" src='js/main.js'></script>
<?php
require "modal_upload.php";
$admin->end();