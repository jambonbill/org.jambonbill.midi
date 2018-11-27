<?php
$btn=[];
$btn[]="<a href=#btn id=btnClear class='btn btn-default pull-right'>Clear</a>";
$btn[]="<a href=#btn id=btnFilter class='btn btn-default'><i class='fa fa-user'></i> Filter</a>";
$btn[]="<a href=#btn id=btnRecord class='btn btn-default'><i class='fa fa-user'></i> Record</a>";
$box=new LTE\Box;
$box->title("Incoming midi events");
$box->icon("fa fa-list");
$box->id("boxIncoming");
//$box->boxTools("<button class=\"btn btn-box-tool\" title='Clear' id=btnClearLogs><i class='fa fa-times'></i></button> ");

$box->body("<pre>Waiting...</pre>");

$htm='<button class="btn btn-sm btn-default">Clear</button>';

$box->footer($htm);
//$box->collapsable(true);
$box->loading(1);
echo $box;