<?php
//spectrum input analyser
$htm='';
$htm.='<div id=content>';
$htm.='<canvas id=canvas></canvas>';
$htm.='</div>';

$box=new LTE\Box;
$box->title("Input");
$box->body($htm);
$box->small('<div id=message></div>');
echo $box;