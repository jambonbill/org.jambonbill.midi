<?php
/**
 * Box
 * @var LTE
 */

$box=new LTE\Card;
$box->title("Tracks");
$box->icon("fa fa-list");
$box->id("boxTracks");
$box->p0(1);
$box->body("<pre>please wait</pre>");

$btns='<button class="btn btn-sm btn-default" id=btnPlay><i class="fa fa-play"></i> </button> ';
$btns.='<button class="btn btn-sm btn-default" id=btnStop><i class="fa fa-stop"></i> </button> ';
$box->footer($btns);
echo $box;
