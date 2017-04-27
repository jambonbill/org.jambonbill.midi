<?php
//box actions
$htm='<div class="row">';
$htm.='<div class="col-md-12">';
$htm.='<a href=#btn id=btnRandom class="btn btn-default">Random patch</a> ';
$htm.='<a href=#btn id=btnKill class="btn btn-default">Kill all notes</a> ';
$htm.='</div>';
$htm.='</div>';

$box=new LTE\Box;
$box->title("Actions");
$box->id("boxActions");
$box->body($htm);
$box->collapsable(1);
$box->loading(1);
echo $box;

