<?php
// box algorithm
$progs=glob("img/program*.png");

$htm='<div class="btn-group btn-group-lg" role="group">';
foreach($progs as $k=>$prog){
	$htm.='<button type="button" class="btn btn-default" title="Algorithm '.($k+1).'" data-id='.($k+1).'>';
	$htm.="<img src=$prog width=32 height=32>";
	$htm.='</button>';
}
$htm.='</div>';

$box=new LTE\Box;
$box->title('Algorithm');
$box->body($htm);
//$box->footer();
$box->collapsable(true);
$box->loading(false);
echo $box;