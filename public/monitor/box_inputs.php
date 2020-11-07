<?php
/**
 * Box MIDI input(s)
 * @var LTE
 */
$box=new LTE\Card;
$box->id("boxInputs");
$box->title("Input(s)");
$box->icon("fa fa-plug");
$box->body('please wait');
$box->p0(1);
$box->loading(1);
echo $box;