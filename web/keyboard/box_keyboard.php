<?php
//Box keyboard 

$htm="<div class='row'>";

$htm.="<div class='col-md-6'>";
$htm.='<label>MIDI output</label>';
$htm.='<button class="btn btn-sm btn-primary" style="width:100%" id=btnMIDIOutput>Midi output</button>';
$htm.='</div>';

$htm.="<div class='col-lg-3'>";
$htm.='<label>Octave</label>';
$htm.="<select class='form-control form-control-sm' id=octave disabled=disabled>";
for($i=0;$i<8;$i++){
	$htm.="<option value='$i'>Oct #".($i+1)."</option>";
}
$htm.="</select>";
$htm.="</div>";

$htm.="<div class='col-lg-3'>";
$htm.='<label>Patch</label>';
$htm.="<select class='form-control form-control-sm' id=prgs disabled=disabled>";
for($i=0;$i<128;$i++){
	$htm.="<option value='$i'>Prg #".($i+1)."</option>";
}
$htm.="</select>";
$htm.="</div>";

$htm.="</div>";

$box=new LTE\Card;
$box->title("Keyboard");
$box->icon("fa fa-keyboard-o");
$box->id("boxKeyboard");
$box->body($htm);

$btns="<button class='btn btn-sm btn-default' id=btnTest>Test middle C</button> ";
$btns.="<button class='btn btn-sm btn-danger pull-right' id=btnMidiPannic><i class='fa fa-times'></i> Panic</button>";

$box->footer($btns);
echo $box;