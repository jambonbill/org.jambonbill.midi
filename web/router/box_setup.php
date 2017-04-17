<?php
$htm=[];
$htm[]='<div class=row>';

$htm[]='<div class="col-sm-4 col-lg-3">';
$htm[]='<label>Input</label>';
$htm[]='<select class=form-control id=midiInput></select>';
$htm[]='</div>';

$htm[]='<div class="col-sm-4 col-lg-3">';
$htm[]='<label>Output</label>';
$htm[]='<select class=form-control id=midiOutput></select>';
$htm[]='</div>';

$htm[]='</div>';

$box=new LTE\Box;
$box->id('boxSetup');
$box->icon('fa fa-edit');
$box->title('Setup');
$box->body($htm);
$box->footer('<a href=# class="btn btn-default"><i class="fa fa-times"></i> Save</a>');
$box->collapsable(1);
$box->loading(1);
echo $box;