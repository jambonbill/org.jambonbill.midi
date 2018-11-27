<?php
$box=new LTE\Box;
$box->title("Input(s)");
$box->icon("fa fa-plug");
$box->id("boxInputs");
$box->body("<select class='form-control' id=midiInput></select>");
//$box->collapsed(0);
$box->loading(1);
echo $box;