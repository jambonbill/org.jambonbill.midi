<?php
$box=new LTE\Box;
$box->title("Input(s)");
$box->icon("fa fa-plug");
$box->id("boxInputs");
$box->body("<select class='form-control' id=midi_inputs></select>");
$box->collapsed(1);
$box->loading(1);
echo $box;