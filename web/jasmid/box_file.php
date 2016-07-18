<?php

$box=new LTE\Box;
$box->title("File");
$box->icon("fa fa-file-o");
$box->id("boxFile");
$box->collapsable(1);
//$box->collapsed(1);
$box->body("<select class='form-control' id=midi_inputs></select>");
echo $box;