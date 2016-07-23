<?php

$box=new LTE\Box;
$box->title("Patch");
$box->icon("fa fa-file-o");
$box->id("boxPatch");
$box->collapsable(true);
$box->body("please wait");
$box->footer("<a href=# class='btn btn-default' id=btnOpen><i class='fa fa-folder-open-o'></i> Open</a>");
echo $box;

$modal=new LTE\Modal;
$modal->title("Patches");
echo $modal;