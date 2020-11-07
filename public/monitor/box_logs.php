<?php
/**
 * Box
 * @var array
 */
$btn=[];
$btn[]="<a href=#btn id=btnClear class='btn btn-default pull-right'>Clear</a>";
$btn[]="<a href=#btn id=btnFilter class='btn btn-default'><i class='fa fa-user'></i> Filter</a>";
$btn[]="<a href=#btn id=btnRecord class='btn btn-default'><i class='fa fa-user'></i> Record</a>";


$box=new LTE\Card;
$box->id("boxIncoming");
$box->title("Incoming midi events");
//$box->icon("fa fa-list");

$tools='<select class="form-control form-control-sm" id=filtChan>';
$tools.='<option value="-1">Every Channels';
for($i=0;$i<16;$i++){
	$tools.='<option value="'.$i.'">Channel #'.($i+1);
}
$tools.='</select>';
$box->tools($tools);


$htm='<div class="p-4"><div class="alert alert-secondary" role="alert">no data</div></div>';
$box->body($htm);

$htm='<button class="btn btn-sm btn-default" id="btnClearLogs">Clear logs</button>';

$box->footer($htm);
$box->p0(true);
$box->loading(1);
echo $box;