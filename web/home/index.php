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
	$box=new LTE\Card;
	$box->title('Input(s)');
	$box->id('boxInputs');
	$box->body();
	$box->footer('<a href=#btn id=btnRefresh1 class="btn btn-default">refresh</a>');
	$box->p0(true);
	$box->loading(1);
	echo $box;//Hello, this is a snippet.
	?>
	</div>

	<div class="col-sm-6">
	<?php
	$box=new LTE\Card;
	$box->id('boxOutputs');
	$box->title('Output(s)');
	$box->body();
	$box->footer('<a href=#btn id=btnRefresh2 class="btn btn-default">refresh</a>');
	$box->p0(true);
	$box->loading(1);
	echo $box;//Hello, this is a snippet.
	?>
	</div>
	</div>
</section>
</div>


<script type="text/javascript" src="js/home.js"></script>
<?php
$admin->end();