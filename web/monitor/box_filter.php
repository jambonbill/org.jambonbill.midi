<?php
$box=new LTE\Box;
$box->title("Filter(s)");
$box->icon("fa fa-filter");
$box->id("boxFilters");
$box->boxTools("<button class=\"btn btn-box-tool\" title='Clear'><i class='fa fa-times'></i></button> ");
$box->collapsable(true);
$box->body("<pre>filter</pre>");
echo $box;