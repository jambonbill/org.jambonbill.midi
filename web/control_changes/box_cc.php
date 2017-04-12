<?php
$box=new LTE\Box;
$box->id("boxCC");
$box->title("CC#0");
$box->icon("fa fa-text");
$box->collapsable(true);
$box->removable(true);

$htm=[];

$htm[]="<div class=row>";
$htm[]="<div class=col-sm-12>";
$htm[]="<label>CC#1</label>";
$htm[]="<input type=range id=midi_send value=0 max=127>";
$htm[]='<button class="btn btn-lg btn-default">CC#00</button>';
$htm[]="</div>";
$htm[]="</div>";

$box->body($htm);
$box->loading(1);
echo $box;

