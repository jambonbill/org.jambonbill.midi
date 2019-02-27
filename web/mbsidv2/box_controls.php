<?php
//controls//

/*
 0C/b) F0 00 00 7E 4B <device-number> 0C 08 F7
        All notes/sequences off

 0C/c) F0 00 00 7E 4B <device-number> 0C 09 [<ins>] F7
        Plays the current patch (C-3 with max velocity is played, can be used
        to test the patch independent of the MIDI channel)

 0F/a) F0 00 00 7E 4B <device number> 0F F7
        Ping (just sends back the same SysEx string + <sids>)
 */

$htm='<div class=row>';

$htm.='<div class=col-sm-6>';
$htm.="<label>Input</label>";
$htm.="<select class='form-control form-control-sm' id=midiInput readonly></select>";
$htm.='</div>';

$htm.='<div class=col-sm-6>';
$htm.="<label>Output</label>";
$htm.="<select class='form-control form-control-sm' id=midiOutput readonly></select>";
$htm.='</div>';

$htm.='</div>';

$box=new LTE\Card;
$box->title("Controls");
$box->icon("fa fa-list");
$box->id("boxControls");
$box->p0(true);
$box->body($htm);

$btns='<div class="button-group">';
$btns.="<a href=# class='btn btn-sm btn-default' id=btnPing>Ping</a> ";
//$btns[]="<a href=# class='btn btn-default' id=btnPlay><i class='fa fa-play'></i></a> ";
//$btns[]="<a href=# class='btn btn-default' id=btnStop><i class='fa fa-stop'></i></a> ";
$btns.="<a href=# class='btn btn-sm btn-default' id=btnReq1>patch dump req</a> ";
$btns.="<a href=# class='btn btn-sm btn-default' id=btnReq2>cur. patch req</a> ";
$btns.="<a href=# class='btn btn-sm btn-default' id=btnReq3>bank request</a> ";
$btns.="</div>";
$box->footer($btns);

echo $box;
