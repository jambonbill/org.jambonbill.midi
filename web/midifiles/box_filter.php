<?php
//box filter
$box=new LTE\Box;
$box->title("Search");
$box->icon("fa fa-search");
$box->id("boxFilter");
$box->collapsable(true);
$box->body("please wait");
echo $box;
