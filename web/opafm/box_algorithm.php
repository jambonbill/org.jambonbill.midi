<?php
// box algorithm
$progs=glob("img/program*.png");

$htm='<div class="btn-group" role="group">';
foreach($progs as $k=>$prog){
	$htm.='<button type="button" class="btn btn-default" title="Algorithm '.($k+1).'" data-id='.($k+1).'>';
	$htm.="<img src=$prog width=32 height=32>";
	$htm.='</button>';
}
$htm.='</div>';

$box=new LTE\Box;
$box->title('Algorithm');
$box->body($htm);
$btns=[];
$btns='<a href=#btn class="btn btn-default"><i class="fa fa-folder-open-o"></i> Open</a>';
$box->footer($btns);
$box->collapsable(true);
$box->loading(false);
echo $box;