<?php
// box Patch
//$progs=glob("img/program*.png");

$htm='<div class="row">';

$htm.='<div class="col-xs-6 col-sm-3 col-lg-2">';//NAME
$htm.='<div class="form-group">';
$htm.='<label>Name</label>';
$htm.='<input class="form-control form-control-sm" value="default" placeholder="Patch name" id=patchname maxlength=8>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-sm-3 col-lg-2">';
$htm.='<label>Algorithm</label><br />';
$htm.='<select class="form-control  form-control-sm" id=algorithm>';
for($i=1;$i<13;$i++){
	$htm.='<option value='.$i.'>Algo #'.$i;
}
$htm.='</select>';
$htm.='</div>';

$htm.='<div class="col-xs-6 col-sm-3 col-lg-2">';//Volume
$htm.='<div class="form-group">';
$htm.='<label>Volume</label>';
$htm.='<input data-cc=9 type=range value=120 max=127 name=Volume>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-xs-6 col-sm-3 col-lg-2">';//Pan
$htm.='<div class="form-group">';
$htm.='<label>Panning</label>';
$htm.='<input data-cc=10 type=range value=64 max=127 name=Panning>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-xs-6 col-sm-3 col-lg-2">';//Flags
$htm.='<div class="form-group">';
$htm.='<label>Flags</label>';
$htm.='<input data-cc=11 type=range value=1 max=16 name=Flags>';
$htm.='</div>';
$htm.='</div>';

$htm.='</div>';


$box=new LTE\Box;
$box->id('boxPatch');
$box->title('Patch');
$box->body($htm);

$btns=[];
$btns[]='<div class=row>';
$btns[]='<div class="col-sm-3">';
$btns[]='<div class="btn-group">';
$btns[]='<a href=#btn class="btn btn-sm btn-default" id=btnNew title="New patch"><i class="fa fa-file-o"></i></a>';
$btns[]='<a href=#btn class="btn btn-sm btn-default" id=btnOpen title="Load xml patch"><i class="fa fa-folder-open-o"></i></a>';
$btns[]='<a href=#btn class="btn btn-sm btn-default" id=btnSave><i class="fa fa-save"></i></a>';
//$btns[]='<a href=#btn class="btn btn-default" id=btnPing disabled>Ping</a>';
//$btns[]='<a href=#btn class="btn btn-default" id=btnTest disabled><i class="fa fa-play"></i> Test</a>';
$btns[]='</div>';

$btns[]='</div>';

$btns[]='<div class="col-sm-3">';
$btns[]='<select class="form-control form-control-sm" id=midiInput></select>';
$btns[]='</div>';

$btns[]='<div class="col-sm-3">';
$btns[]='<select class="form-control form-control-sm" id=midiOutput></select>';
$btns[]='</div>';

$btns[]='<div class="col-sm-3">';
$btns[]='<select class="form-control form-control-sm" id=midiChannel>';
for($i=0;$i<16;$i++){
	$btns[]='<option value='.$i.'>Channel #'.($i+1);
}
$btns[]='</select>';
$btns[]='</div>';

$btns[]='</div>';

$box->footer($btns);
//$box->collapsable(true);
$box->loading(1);
echo $box;