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
$box->title("I/O");
$box->id("boxIO");
$box->collapsed(1);
$box->body("<pre>ok</pre>");
echo $box;