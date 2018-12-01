<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("midi.jambonbill.org");

include "meta.php";

echo $admin;
?>
<section class="container">
<h1>midi.jambonbill.org</h1>
<!--
Here is a collection of web 'apps' that i wrote to help me work with the midi protocol.<br />
After many years, i was tired of using crappy softwares designed for specific equipments or operating systems.<br />
Enjoy !
-->

<div class=row>
	<div class="col-sm-6">
	<?php
	$box=new LTE\Box;
	$box->title('Available input(s)');
	$box->id('boxInputs');
	$box->body();
	$box->footer('<a href=#btn id=btnRefresh1 class="btn btn-default">refresh</a>');
	//$box->collapsable(true);
	$box->loading(1);
	echo $box;//Hello, this is a snippet.
	?>
	</div>

	<div class="col-sm-6">
	<?php
	$box=new LTE\Box;
	$box->id('boxOutputs');
	$box->title('Available output(s)');
	$box->body();
	$box->footer('<a href=#btn id=btnRefresh2 class="btn btn-default">refresh</a>');
	//$box->collapsable(true);
	$box->loading(1);
	echo $box;//Hello, this is a snippet.
	?>
	</div>

</div>

<script type="text/javascript" src="js/home.js"></script>
<?php
$admin->end();