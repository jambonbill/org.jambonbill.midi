<?php

$htm='<canvas id="screen">';

$box=new LTE\Box;
$box->title("Canvas");
$box->id("boxCanvas");
$box->collapsable(1);
$box->body($htm);
$box->footer("<a href=#btn class='btn btn-default' onclick=drawMidiTrack(0)>draw</a>");

echo $box;
