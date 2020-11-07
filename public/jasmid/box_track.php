<?php
$box=new LTE\Card;
$box->title("Track");
$box->icon("fa fa-list");
$box->id("boxTrack");
$box->removable(1);
$box->collapsable(1);
$box->collapsed(1);
$box->body("<pre>please wait</pre>");
echo $box;
