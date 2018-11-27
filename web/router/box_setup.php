<?php

$htm='<div class=row>';

$htm.='<div class="col-md-6 col-lg-4">';
$htm.='<label>Source</label>';
$htm.='<select class="form-control form-control-sm" id=midiInputs size=4></select>';
$htm.='</div>';

$htm.='<div class="col-md-6 col-lg-4">';
$htm.='<label>Destination</label>';
$htm.='<select class="form-control form-control-sm" id=midiOutputs size=4></select>';
$htm.='</div>';

$htm.='</div>';

$box=new LTE\Box;
$box->id('boxSetup');
//$box->icon('fa fa-edit');
$box->title('Sources');
$box->body($htm);
$box->footer('<a href=# class="btn btn-sm btn-default"><i class="fa fa-plus-circle"></i> Create route</a>');
//$box->collapsable(1);
$box->loading(1);
echo $box;