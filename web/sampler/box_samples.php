<?php
/**
 * Box samples
 * @var LTE
 */
$box=new LTE\Card;
$box->title("Samples");
//$box->icon("fa fa-plug");
$box->id("boxSamples");
//$box->body("<select class='form-control' id=midiInput size=4></select>");
//$box->p0(1);
$box->loading(1);
echo $box;