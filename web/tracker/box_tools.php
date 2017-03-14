<?php

$htm=[];

$htm[]="<div class='row'>";

$htm[]="<div class='col-xs-6'>";
$htm[]="<select class='form-control' id=midiChannel disabled=disabled>";
for($i=0;$i<16;$i++){
	$htm[]="<option value=$i>Channel #".($i+1)."</option>";
}
$htm[]="</select>";
$htm[]="</div>";

$htm[]="</div>";//end row


$box=new LTE\Box;
$box->title("tracker");
$box->id("boxToolss");
$box->collapsed(1);
$box->body("<pre>ok</pre>");
$btns=[];
$btns[]='<a href=# class="btn btn-default">Open</a>';
$btns[]=' <a href=# class="btn btn-default">Save</a>';
$box->footer($btns);
echo $box;