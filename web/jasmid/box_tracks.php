<?php

$box=new LTE\Box;
$box->title("Tracks");
$box->icon("fa fa-list");
$box->id("boxTracks");
$box->collapsable(1);
$box->body("<pre>please wait</pre>");

$btns=[];
$btns[]='<a href=# class="btn btn-default" id=btnPlay><i class="fa fa-play"></i> </a> ';
$btns[]='<a href=# class="btn btn-default" id=btnStop><i class="fa fa-stop"></i> </a> ';
$box->footer($btns);
echo $box;
