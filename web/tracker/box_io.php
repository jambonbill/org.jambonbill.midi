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
//$box->body("<pre>ok</pre>");
$box->footer('<a href=# id=btnOutput class="btn btn-default"><i class="fa fa-edit"></i> Change</a>');
echo $box;

$modal=new LTE\Modal;
$modal->id('myModal');
$modal->icon('fa fa-edit');
$modal->title('Select MIDI Output');
$modal->body('hi');
$modal->footer('<a href=# class="btn btn-default" data-dismiss=modal>Cancel</a>');
echo $modal;