<?php
$box=new LTE\Box;
$box->title("Setup");
//$box->icon("fa fa-text");
$box->id("boxSetup");
$box->collapsable(true);

$htm=[];

$htm[]="<div class=row>";

$htm[]="<div class=col-sm-4>";
$htm[]="<label>Name</label>";
$htm[]="<input type=range id=midi_send value=0 max=127>";
$htm[]="</div>";

$htm[]="<div class=col-sm-4>";
$htm[]="<label>Output</label>";
$htm[]="<input type=range id=midi_send value=0 max=127>";
$htm[]="</div>";


$htm[]="</div>";

$box->body($htm);
/*
$btns=[];
$btns[]="<a href=# class='btn btn-default' id=btnLoadSysex><i class='fa fa-folder-open-o'></i> Load .syx</a> ";
$btns[]="<a href=# class='btn btn-default' id=btnSendSysex><i class='fa fa-play'></i> Send</a>";
//$box->footer($btns);
*/
echo $box;

