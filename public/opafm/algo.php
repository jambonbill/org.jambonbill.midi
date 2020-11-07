<?php
// Algo's
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("OPA FM Shield");

echo $admin;
?>

<section class="container">

	<div class='row'>
		<div class='col-md-12'>
			<h1>Algorithm</h1>
			<hr />
		</div>
		<div class='col-sm-12'>
		<?php
		//include "box_patch.php";
		$images=glob("img/program*.png");
		foreach($images as $k=>$v){
			//echo "<li>$k - $v";
			echo '<button class="btn btn-sm btn-default" title="'.($k+1).'"><img src="'.$v.'"></button>';
			if($k%4==3)echo '<br />';
		}
		?>
		</div>

	</div>

</section>

<?php
$admin->end();