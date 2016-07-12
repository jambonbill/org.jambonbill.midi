<?php
$box=new LTE\Box;
$box->title("Input(s)");
$box->icon("fa fa-plug");
$box->id("boxInputs");
$box->collapsable(true);
$box->body("<select class='form-control' id=midi_inputs size=3></select>");
echo $box;