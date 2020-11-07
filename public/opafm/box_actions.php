<?php
//box actions
$htm='<div class="row">';
$htm.='<div class="col-md-12">';
$htm.='<a href=#btn id=btnRandom class="btn btn-sm btn-default">Random patch</a> ';
$htm.='<a href=#btn id=btnResend class="btn btn-sm btn-default">Send all</a> ';
$htm.='<a href=#btn id=btnDownload class="btn btn-sm btn-default">Download</a> ';
$htm.='<a href=#btn id=btnPing class="btn btn-sm btn-default">Ping</a> ';
$htm.='<a href=#btn id=btnPanic class="btn btn-sm btn-default">Panic</a> ';

$htm.='<div class="btn-group pull-right">';
$htm.='<a href=#btn id=btnLoad class="btn btn-sm btn-default">Load Internal</a> ';
$htm.='<a href=#btn id=btnStore class="btn btn-sm btn-default">Store Internal</a> ';
$htm.='<a href=#btn id=btnKill1 class="btn btn-sm btn-default">All notes off</a> ';
$htm.='<a href=#btn id=btnKill2 class="btn btn-sm btn-default">All sounds off</a> ';
$htm.='</div>';

$htm.='</div>';
$htm.='</div>';

$box=new LTE\Card;
$box->title("Actions");
$box->id("boxActions");
$box->body($htm);
//$box->collapsable(1);
$box->loading(1);
echo $box;

