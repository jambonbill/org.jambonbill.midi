<?php
$files=glob("configs/*.json");
//print_r($files);

$htm ='<table class="table table-hover table-condensed" style="cursor:pointer">';
$htm.='<thead>';
$htm.='<th>Filename</th>';
$htm.='</thead>';
$htm.='<tbody>';
foreach($files as $file){
	$htm.='<tr data-filename="'.basename($file).'">';
	$htm.='<td>'.basename($file);
}
$htm.='</tbody>';
$htm.='</table>';

$modal=new LTE\Modal;
$modal->id('modalConfigs');
$modal->icon('fa fa-folder-open');
$modal->title('Load');
$modal->body($htm);

$btns=[];
//$btns[]='<a href=#btn class="btn btn-default" id=btnUpdate><i class="fa fa-save"></i> Update</a>';
//$btns[]='<a href=#btn class="btn btn-default" title="Delete CC Widget" id=btnDelete><i class="fa fa-times"></i></a>';
$btns[]='<a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>';

$modal->footer($btns);
echo $modal;