<?php
$box=new LTE\Box;
$box->title("Send CC");
$box->icon("fa fa-text");
$box->id("boxSend");
$box->collapsable(true);

$htm=[];

$htm[]="<div class=row>";
$htm[]="<div class=col-sm-12>";
$htm[]="<label>CC#1</label>";
$htm[]="<input type=range id=midi_send value=0 max=127>";
$htm[]="</div>";
$htm[]="</div>";

$box->body($htm);

$btns=[];
$btns[]="<a href=# class='btn btn-default' id=btnLoadSysex><i class='fa fa-folder-open-o'></i> Load .syx</a> ";
$btns[]="<a href=# class='btn btn-default' id=btnSendSysex><i class='fa fa-play'></i> Send</a>";
$box->footer($btns);
echo $box;

