<?php
//box filter

$htm ='<div class="row">';
$htm.='<div class="col-sm-4">';
$htm.='<input class="form-control" placeholder="Search">';
$htm.='</div>';
$htm.='</div>';

$box=new LTE\Box;
$box->title("Search");
$box->icon("fa fa-search");
$box->id("boxFilter");
$box->collapsable(true);
$box->loading(true);
$box->body($htm);

$btns=[];
if (is_writeable(__DIR__."/../../midifiles/")) {
	$btns[]='<a href=#btn class="btn btn-default" id=btnUpload><i class="fa fa-upload"></i> Upload midi file</a> ';
	$btns[]='<a href=#btn class="btn btn-default" id=btnWget>wget</a> ';
} else {
	$btns[]='<a href=#btn class="btn btn-default" id=btnUpload disabled><i class="fa fa-upload"></i> dest not writable</a>';
}
$box->footer($btns);

echo $box;
