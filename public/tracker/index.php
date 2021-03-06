<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
$admin->title("MIDI Tracker");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-keyboard-o'></i> MIDI Tracker
  <small>sort of</small>
  </h1>
</section>

<section class="content">
	
	<div class='row'>

		<div class='col-sm-6'>
			<?php
			include "box_tools.php";
			?>
		</div>
		<div class='col-sm-6'>
			<?php
			include "box_io.php";
			?>
		</div>
	</div>
	
	<div class='row'>
		<div class='col-sm-6'>
			<?php
			include "box_song.php";
			?>
		</div>
		<div class='col-sm-2'>
			<?php
			include "box_chain.php";
			?>
		</div>

		<div class='col-sm-4'>
			<?php
			include "box_phrase.php";
			?>
		</div>
		
	</div>

<!-- HELP -->
<pre>
tracker.init()
tracker.tracks(),
tracker.song(),
tracker.chain(),
tracker.phrase(),
tracker.tick()
</pre>

<pre>
Song structure: 

Chain structure:

Pattern structure:
Array>16 steps;
Each step is Array[8] [noteNumber,cc1,cc2]

</pre>

<a href=# class="btn btn-default">tick</a>


</section>


<script type="text/javascript" src='js/midi.js'></script>
<script type="text/javascript" src='js/tracker.js'></script>
<script type="text/javascript" src='js/tracker_ui.js'></script>
<style>
.rowselected{
	color:black;
	font-weight: bold;
	font-style: italic;
	background:#ccc;
}
</style>
<?php
//$admin->footer("Midi - Sequencer");
$admin->end();
