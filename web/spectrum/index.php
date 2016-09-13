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
  <h1><i class='fa fa-list'></i> Spectrum analyzer
  <small></small>
  </h1>
</section>

<section class="content">

<?php
$htm='<div id=message></div>';
$htm.='<div id=content style="text-align: center">';
$htm.='<canvas id=canvas></canvas>';
$htm.='</div>';

$box=new LTE\Box;
$box->title("Input");
$box->body($htm);
echo $box;
?>

<script src='js/fft.js'></script>
<script src='js/cybuf.js'></script>
<script src='js/main.js' charset="utf-8"></script>
<script type="text/javascript" src="js/dat.gui.min.js"></script>
</head>

  

