<?php
// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
$htm=[];

$htm[]="<div class=row>";

$htm[]="<div class=col-sm-6>";
$htm[]="<input type=text class='form-control' id='keyname' placeholder='Hit a key !'>";
$htm[]="</div>";

$htm[]="<div class=col-sm-6>";
$htm[]="<input type=text class='form-control' id='keycode' placeholder='Keycode' readonly>";
$htm[]="</div>";

$htm[]="</div>";

$box=new LTE\Box;
$box->title("Keyboard mapping");
$box->icon("fa fa-cogs");
$box->id("boxMapping");
$box->collapsable(1);
$box->collapsed(1);
$box->body($htm);
$box->footer("<a href=#btn id=btnMapping class='btn btn-default'><i class='fa fa-list'></i> Mapping</a>");
echo $box;