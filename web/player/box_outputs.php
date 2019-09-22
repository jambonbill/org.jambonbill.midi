<?php
/**
 * Box midi output
 * @var LTE
 */
$box=new LTE\Card;
$box->id("boxOutputs");
$box->title("MIDI output(s)");
//$box->icon("fa fa-plug");
$box->p0(1);
//$box->body("<select class='form-control' id=midi_outputs size=4></select>");
echo $box;