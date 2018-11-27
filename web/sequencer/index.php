<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("MIDI Sequencer");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-keyboard-o'></i> (simple) Sequencer
  <small>16 step pattern</small>
  </h1>
</section>

<section class="content">

<div class=row>
	<div class="col-md-12">
	<?php
	
	$htm ='<table class="table table-condensed">';
	$htm.='<thead>';
	$htm.="<th>#</th>";
	for($i=0;$i<16;$i++){
		$htm.="<th>".($i+1)."</th>";
	}
	$htm.='</thead>';
	$htm.='<tbody>';
	//for()
	$htm.='<tr>';
	$htm.='<td>Name';
	for($i=0;$i<16;$i++){
		$htm.="<td>".($i+1);
	}
	
	$htm.='</tbody>';
	$htm.='</table>';

	$box=new LTE\Box;
	$box->id('boxId');
	$box->title('title');
	$box->body($htm);
	$box->footer('<a href=#btn class="btn btn-default" id=btnSave>Save</a>');
	$box->collapsable(true);
	$box->loading(1);
	echo $box;
	?>
	</div>
</div>


<script type="text/javascript" src='js/keyboard.js'></script>

<?php
$admin->footer("Midi - Sequencer");
$admin->end();
