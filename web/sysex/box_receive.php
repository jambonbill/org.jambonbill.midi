<?php
$box=new LTE\Box;
$box->title("Receive");
$box->icon("fa fa-text");
$box->id("boxReceive");
$box->collapsable(true);
$box->body("<textarea class='form-control' id=midi_inputs rows=10 ></textarea>");
$box->footer("<a href=#save class='btn btn-default'><i class='fa fa-save'></i> Save</a>");
echo $box;