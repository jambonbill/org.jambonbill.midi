<?php
$modal=new LTE\Modal;
$modal->icon("fa fa-file-o");
$modal->title("Patch");

$htm='<div class=row>';
$htm.='</div>';
$modal->body($htm);

$btns=[];
$btns[]='<a href=#btn class="btn btn-default">Download</a>';
$btns[]=' <a href=#btn class="btn btn-default">Send</a>';

$modal->footer($btns);
echo $modal;