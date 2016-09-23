<?php

$htm='<canvas id="screen" style="background-color:#f0f0f0">';

$btns=[];
$btns[]="<div class='col-md-6'>";
$btns[]="<select class='form-control' id=trackSelect><option>Select track</select>";
$btns[]="</div>";
$btns[]="<a href=#btn class='btn btn-default' onclick=drawMidiTrack(0)>draw</a>";

$box=new LTE\Box;
$box->title("Canvas");
$box->id("boxCanvas");
$box->collapsable(1);
$box->body($htm);
$box->footer($btns);

echo $box;
