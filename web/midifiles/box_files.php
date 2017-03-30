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

