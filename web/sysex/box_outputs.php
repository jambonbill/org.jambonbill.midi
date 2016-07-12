<?php
$box=new LTE\Box;
$box->title("Output(s)");
$box->icon("fa fa-plug");
$box->id("boxOutputs");
$box->collapsable(true);
$box->body("<select class='form-control' id=midi_outputs size=2 disabled=disabled></select>");
echo $box;