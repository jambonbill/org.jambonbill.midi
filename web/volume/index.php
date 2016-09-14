<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Volume meter");
echo $admin;

// https://gilian.web.elte.hu/demos/spectrum_analyzer/index.html
?>
<style type="text/css" src='css/spectrum.css'></style>
<section class="content-header">
  <h1><i class='fa fa-microphone'></i> Volume
  <small></small>
  </h1>
</section>

<section class="content">

<p>This sample shows how to implement a clip-indicating volume meter in Web Audio, using a ScriptProcessor.  
It's necessary to use a ScriptProcessor in order to not miss any clipping samples - otherwise you could implement this using a RealtimeAnalyser to only grab samples when necessary.</p>
		
		<canvas id="meter" width="500" height="50"></canvas>

		<p>The usage is quite easy:
		<pre>var meter = createAudioMeter(audioContext,clipLevel,averaging,clipLag);

audioContext: the AudioContext you're using.
clipLevel: the level (0 to 1) that you would consider "clipping".  Defaults to 0.98.
averaging: how "smoothed" you would like the meter to be over time.  
Should be between 0 and less than 1.  Defaults to 0.95.
clipLag: how long the "clipping" indicator to show after clipping has occured, in ms.  
Defaults to 750ms.

meter.checkClipping();

returns true if the node has clipped in the last clipLag milliseconds.

meter.shutdown();//used to destroy the node 
				// (it's important to disconnect and remove the event handler
				// for any ScriptProcessor).
</pre>

<script src='js/volume-meter.js' charset="utf-8"></script>
<script src='js/main.js' charset="utf-8"></script>

<?php
include "box_volume.php";
//include "box_settings.php";



$admin->footer('Check out the <a href="http://github.com/cwilso/volume-meter/">source on Github');
$admin->end();


