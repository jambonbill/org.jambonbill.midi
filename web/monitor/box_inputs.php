<?php
$box=new LTE\Box;
$box->title("Input(s)");
$box->icon("fa fa-plug");
$box->id("boxInputs");
$box->collapsable(1);
$box->collapsed(1);
$box->body("<select class='form-control' id=midi_inputs></select>");
echo $box;