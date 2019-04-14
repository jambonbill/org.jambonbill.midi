<?php
/**
 * Box
 * @var LTE
 */
$box=new LTE\Card;
$box->title("Input(s)");
$box->icon("fa fa-plug");
$box->id("boxInputs");
$box->body("<select class='form-control' id=midiInput size=4></select>");
//$box->p0(1);
$box->loading(1);
echo $box;