<?php
$htm=[];
$htm[]="<div class='row'>";
$htm[]="<div class='col-xs-6'>";
$htm[]="<select class='form-control' id=midiChannel disabled=disabled>";
for($i=0;$i<16;$i++){
	$htm[]="<option value=$i>Channel #".($i+1)."</option>";
}
$htm[]="</select>";
$htm[]="</div>";
$htm[]="<div class='col-xs-6'>";
$htm[]="<select class='form-control' id=octave disabled=disabled>";
for($i=0;$i<5;$i++){
	$htm[]="<option value='$i'>Octave #".($i+1)."</option>";
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

$box->footer("<a href=#list class='btn btn-default'>Test middle C</a> <a href=#btn class='btn btn-default' id=btnMidiPannic><i class='fa fa-times'></i> Midi panic</a>");
echo $box;