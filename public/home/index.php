<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("midi.jambonbill.org");

include "meta.php";

echo $admin;
?>
<div class="content-wrapper">

	<section class="container">
		<h1>midi.jambonbill.org</h1>
	</section>

	<section class="container">
		<div class=row>
			<div class="col-sm-6">
			<?php
			require "box_inputs.php";
			?>
			</div>

			<div class="col-sm-6">
			<?php
			require "box_outputs.php";
			?>
			</div>
		</div>
	</section>
</div>

<script type="text/javascript" src="js/home.js"></script>
<?php
$admin->end();