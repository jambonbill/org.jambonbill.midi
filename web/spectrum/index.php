<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("Spectrum analyzer");
echo $admin;

// https://gilian.web.elte.hu/demos/spectrum_analyzer/index.html
?>
<section class="content-header">
  <h1><i class='fa fa-microphone'></i> Spectrum analyzer
  <small></small>
  </h1>
</section>

<section class="content">

<?php
include "box_spectrum.php";
include "box_settings.php";
?>

<script src='js/fft.js'></script>
<script src='js/cybuf.js'></script>
<script src='js/main.js' charset="utf-8"></script>
<script src='js/midi.js' charset="utf-8"></script>
<script type="text/javascript" src="js/dat.gui.min.js"></script>
<style type="text/css" src='css/spectrum.css'></style>

  

