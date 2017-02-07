<?php
$htm=[];

$htm[]="<div class='row'>";
/*
$htm[]="<div class='col-xs-6'>";
$htm[]="<select class='form-control' id=midiChannel disabled=disabled>";
for($i=0;$i<16;$i++){
	$htm[]="<option value=$i>Channel #".($i+1)."</option>";
}
$htm[]="</select>";
$htm[]="</div>";
*/
$htm[]="<div class='col-xs-6'>";
$htm[]="<select class='form-control' id=octave disabled=disabled>";
for($i=0;$i<8;$i++){
	$htm[]="<option value='$i'>Octave #".($i+1)."</option>";
}
$htm[]="</select>";
$htm[]="</div>";
$htm[]="</div>";

$htm[]="<br />";

$htm[]="<div class='row'>";
$htm[]="<div class='col-xs-6'>";
$htm[]="<select class='form-control' id=prgs disabled=disabled>";
for($i=0;$i<128;$i++){
	$htm[]="<option value='$i'>Prg #".($i+1)."</option>";
}
$htm[]="</select>";
$htm[]="</div>";
$htm[]="</div>";

$box=new LTE\Box;
$box->title("Keyboard");
$box->icon("fa fa-keyboard-o");
$box->id("boxKeyboard");
$box->collapsable(true);
$box->body($htm);

$btns=[];
$btns[]="<a href=#btn class='btn btn-default' id=btnTest>Test middle C</a> ";
$btns[]="<a href=#btn class='btn btn-danger pull-right' id=btnMidiPannic><i class='fa fa-times'></i> Panic</a>";

$box->footer($btns);
echo $box;