<?php
// MIDI Sampler
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
echo $admin;
?>

<div class="content-wrapper">

	<section class="container">
	  <h1>Sampler
	  	<small>ok now calm down</small>
	  </h1>
	</section>

	<section class="container">

		<div class='row'>
			<div class='col-sm-5'>
			<?php
			require "box_input.php";
			?>
			</div>
			<div class='col-sm-7'>
			<?php
			require "box_samples.php";
			?>
			</div>
		</div>
	</section>
</div>

<script type="text/javascript" src='js/main.js'></script>
<?php
$admin->end();