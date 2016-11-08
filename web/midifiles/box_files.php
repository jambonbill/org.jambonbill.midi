<?php
//midi files
$box=new LTE\Box;
$box->title("File(s)");
$box->icon("fa fa-file-o");
$box->id("boxFiles");
$box->collapsable(true);
$box->loading(true);
$box->body("please wait");
echo $box;


$htm=[];
$htm[]='<textarea class="form-control" id=midinfo rows=8></textarea>';

$modal=new LTE\Modal;
$modal->id('myModal');
$modal->icon('fa fa-edit');
$modal->title('midifile');
$modal->body($htm);

$btn=[];
$btn[]='<a href=#btn class="btn btn-default" data-dismiss=modal>Close</a>';

$modal->footer($btn);

echo $modal;
