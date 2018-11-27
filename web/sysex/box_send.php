<?php

$box=new LTE\Box;
$box->id("boxSend");
$box->title("Send");
$box->icon("fa fa-text");


$htm='<div class="row">';

$htm.='<div class=col-md-12>';
$htm.='<textarea class="form-control" id="midi_send" rows=10 placeholder="Paste your hex code here" style="font-family:monospace;width:100%" readonly></textarea>';
$htm.='</div>';

$htm.='<div class=col-md-12>';
$htm.='<label>Send to</label>';
$htm.='<select class="form-control form-control-sm" id=midiOutput readonly><option>Select midi output</select>';
$htm.='</div>';

$htm.='</div>';

$box->body($htm);

$btns='<div class=row>';
$btns.='<div class=col-sm-6>';
$btns.='<a href=# class="btn btn-sm btn-default" id=btnLoadSysex disabled><i class="fa fa-folder-open-o"></i> Load .syx</a> ';
$btns.='<a href=# class="btn btn-sm btn-default" id=btnSendSysex disabled><i class="fa fa-play"></i> Send</a>';
$btns.='</div>';

$btns.='</div>';

$box->footer($btns);
$box->loading(true);
$box->collapsable(true);
echo $box;