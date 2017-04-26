<?php
// box Patch
$progs=glob("img/program*.png");

$htm='<div class="row">';

$htm.='<div class="col-xs-6 col-sm-3">';//NAME
$htm.='<div class="form-group">';
$htm.='<label>Name</label>';
$htm.='<input class="form-control" placeholder="Patch name" maxlength=8>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-xs-6 col-sm-3">';//Volume
$htm.='<div class="form-group">';
$htm.='<label>Volume</label>';
$htm.='<input data-cc=9 type=range value=120 max=127 class="form-control">';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-xs-6 col-sm-3">';//Pan
$htm.='<div class="form-group">';
$htm.='<label>Paning</label>';
$htm.='<input data-cc=10 type=range value=64 max=127 class="form-control">';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-xs-6 col-sm-3">';//Flags
$htm.='<div class="form-group">';
$htm.='<label>Flags</label>';
$htm.='<input data-cc=11 type=range value=1 max=16 class="form-control">';
$htm.='</div>';
$htm.='</div>';

$htm.='</div>';


$htm.='<div class="row">';
$htm.='<div class="col-sm-12">';
$htm.='<label>Algorithm</label><br />';
$htm.='<div class="btn-group" role="group">';
foreach($progs as $k=>$prog){
	$htm.='<button type="button" class="btn btn-default algorithm" title="Algorithm '.($k+1).'" data-id='.($k+1).'>';
	$htm.="<img src=$prog width=32 height=32>";
	$htm.='</button>';
}
$htm.='</div>';
$htm.='</div>';
$htm.='</div>';

$box=new LTE\Box;
$box->title('Patch');
$box->body($htm);

$btns=[];
$btns[]='<div class=row>';
$btns[]='<div class="col-md-3">';
$btns[]='<div class="btn-group">';
$btns[]='<a href=#btn class="btn btn-default" id=btnOpen title="Load xml patch"><i class="fa fa-folder-open-o"></i></a>';
$btns[]='<a href=#btn class="btn btn-default" id=btnSave><i class="fa fa-save"></i></a>';
//$btns[]='<a href=#btn class="btn btn-default" id=btnPing disabled>Ping</a>';
$btns[]='<a href=#btn class="btn btn-default" id=btnTest disabled><i class="fa fa-play"></i> Test</a>';
$btns[]='</div>';

$btns[]='</div>';

$btns[]='<div class="col-md-3">';
$btns[]="<select class=form-control id=midiInput></select>";
$btns[]='</div>';

$btns[]='<div class="col-md-3">';
$btns[]="<select class=form-control id=midiOutput></select>";
$btns[]='</div>';

$btns[]='<div class="col-md-3">';
$btns[]='<select class=form-control id=midiChannel>';
for($i=0;$i<16;$i++){
	$btns[]='<option value='.$i.'>Channel #'.($i+1);
}
$btns[]='</select>';
$btns[]='</div>';

$btns[]='</div>';

$box->footer($btns);
$box->collapsable(true);
$box->loading(1);
echo $box;