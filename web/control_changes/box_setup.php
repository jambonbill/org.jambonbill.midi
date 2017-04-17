<?php
$box=new LTE\Box;
$box->id("boxSetup");
$box->title("Setup");
$box->collapsable(true);

$htm=[];

$htm[]="<div class=row>";

$htm[]='<div class=col-sm-3>';
$htm[]='<label>Name</label>';
$htm[]='<input type=text class="form-control" id=patch_name placeholder="Config name">';
$htm[]='</div>';

$htm[]="<div class=col-sm-3>";
$htm[]="<label>Input</label>";
$htm[]="<select class=form-control id=midiInput></select>";
$htm[]="</div>";

$htm[]="<div class=col-sm-3>";
$htm[]="<label>Output</label>";
$htm[]="<select class=form-control id=midiOutput></select>";
$htm[]="</div>";

$htm[]="<div class=col-sm-3>";
$htm[]="<label>Channel</label>";
$htm[]="<select class=form-control id=midiChannel>";
for($i=0;$i<16;$i++)$htm[]="<option value=$i>Channel #".($i+1);
$htm[]="</select>";
$htm[]="</div>";

$htm[]="</div>";

$box->body($htm);

$btns=[];
$btns[]="<a href=# class='btn btn-primary' id=btnAdd>Add item</a>";
$btns[]="<a href=# class='btn btn-default' id=btnClearAll>Clear all</a>";
$btns[]="<a href=# class='btn btn-default' id=btnLoadConf>Load config</a>";
$btns[]="<a href=# class='btn btn-default' id=btnSaveConf>Save config</a>";
$box->footer($btns);

$box->loading(1);
echo $box;
