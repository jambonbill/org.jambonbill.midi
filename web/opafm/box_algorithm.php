<?php
// box Patch
$progs=glob("img/program*.png");

$htm='<div class="row">';

$htm.='<div class="col-sm-4">';//NAME
$htm.='<div class="form-group">';
$htm.='<label>Name</label>';
$htm.='<input class="form-control" placeholder="Patch name">';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-sm-4">';//VOlume
$htm.='<div class="form-group">';
$htm.='<label>Volume</label>';
$htm.='<input type=range max=255 class="form-control" placeholder="Patch name">';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-sm-4">';//Pan
$htm.='<div class="form-group">';
$htm.='<label>Paning</label>';
$htm.='<input type=range max=255 class="form-control" placeholder="Patch name">';
$htm.='</div>';
$htm.='</div>';


$htm.='</div>';


$htm.='<div class="row">';
$htm.='<div class="col-sm-12">';
$htm.='<label>Algorithm</label><br />';
$htm.='<div class="btn-group" role="group">';
foreach($progs as $k=>$prog){
	$htm.='<button type="button" class="btn btn-default" title="Algorithm '.($k+1).'" data-id='.($k+1).'>';
	$htm.="<img src=$prog width=40 height=40>";
	$htm.='</button>';
}
$htm.='</div>';
$htm.='</div>';
$htm.='</div>';

$box=new LTE\Box;
$box->title('Patch');
$box->body($htm);

$btns=[];
$btns[]='<a href=#btn class="btn btn-default" id=btnOpen><i class="fa fa-folder-open-o"></i> Open xml patch</a> ';
$btns[]='<a href=#btn class="btn btn-default" id=btnSave><i class="fa fa-save"></i> Save as xml</a>';

$box->footer($btns);
$box->collapsable(true);
$box->loading(false);
echo $box;