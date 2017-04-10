<?php
$modal=new LTE\Modal;
$modal->id("modalPatch");
$modal->icon("fa fa-file-o");
$modal->title("Patch");

$htm='<div class=row>';
$htm.='</div>';
$modal->body($htm);

$btns=[];
$btns[]='<a href=#btn class="btn btn-default"><i class="fa fa-download"></i> Download</a>';
$btns[]=' <a href=#btn class="btn btn-default"><i class="fa fa-send"></i> Send</a>';
$btns[]=' <a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>';

$modal->footer($btns);
echo $modal;