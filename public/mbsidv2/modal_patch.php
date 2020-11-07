<?php
$modal=new LTE\Modal;
$modal->id("modalPatch");
$modal->icon("fa fa-file-o");
$modal->title("Patch");


$htm='<div class=row>';

$htm.='<div class=col-sm-6>';
$htm.='<div class=form-group>';
$htm.='<label>Patch name</label>';
$htm.='<input type=text class=form-control id=patchName maxlength=16>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class=col-sm-6>';
$htm.='<div class=form-group>';
$htm.='<label>Engine</label>';
$htm.='<input type=text class=form-control id=engine>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class=col-sm-3>';
$htm.='<div class=form-group>';
$htm.='<label>Device</label>';
$htm.='<input type=text class=form-control readonly>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class=col-sm-3>';
$htm.='<div class=form-group>';
$htm.='<label>Bank</label>';
$htm.='<input type=text class=form-control readonly>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class=col-sm-3>';
$htm.='<div class=form-group>';
$htm.='<label>Patch num</label>';
$htm.='<input type=text class=form-control readonly>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class=col-sm-3>';
$htm.='<div class=form-group>';
$htm.='<label>Volume</label>';
$htm.='<input type=text class=form-control readonly>';
$htm.='</div>';
$htm.='</div>';

/*
device-number:0
bank:1
patch:8
volume:127

osc_detune:4
osc_phase_offset:0
*/

$htm.='</div>';
$modal->body($htm);

$btns=[];
$btns[]='<a href=#btn class="btn btn-default"><i class="fa fa-download"></i> Download</a>';
$btns[]=' <a href=#btn class="btn btn-default"><i class="fa fa-send"></i> Send</a>';
$btns[]=' <a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>';

$modal->footer($btns);
echo $modal;