<?php
$box=new LTE\Box;
$box->title("Send");
$box->icon("fa fa-text");
$box->id("boxSend");
$box->collapsable(true);
$box->body("<textarea class='form-control' id=midi_send rows=10 placeholder='Paste your hex code here'></textarea>");
$box->footer("<a href=# class='btn btn-default'><i class='fa fa-play'></i> Send</a>");
echo $box;