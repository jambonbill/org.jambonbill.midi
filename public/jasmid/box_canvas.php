<?php

$htm='<canvas id="screen">';

$btns="<div class='col-md-6'>";
$btns.="<select class='form-control form-control-sm' id=trackSelect><option>Select track</select>";
$btns.="</div>";
$btns.="<button class='btn btn-sm btn-default' onclick=drawMidiTrack(0)>draw</button>";

$box=new LTE\Card;
$box->title("Canvas");
$box->id("boxCanvas");
//$box->collapsable(1);
$box->body($htm);
$box->footer($btns);

echo $box;
