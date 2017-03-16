<?php
// spectrum input analyser settings

$htm=[];

$htm[] = '<div class="row">';

// MIDI Output

$htm[] = '<div class="col-sm-4">';
$htm[] = '<div class="form-group">';
$htm[] = '<label for="title">Midi out</label>';
$htm[] = '<select class="form-control" id="midi_outputs">';
$htm[] = '</select>';
$htm[] = '</div>';
$htm[] = '</div>';

// MIDI Chn
$htm[] = '<div class="col-sm-4">';
$htm[] = '<div class="form-group">';
$htm[] = '<label for="title">Midi Chn</label>';
$htm[] = '<select class="form-control" id="midi_chan">';
for($i=0;$i<16;$i++){
	$htm[] = '<option value=$i>'.($i+1).'</option>';
}
$htm[] = '</select>';
$htm[] = '</div>';
$htm[] = '</div>';

// CC
$htm[] = '<div class="col-sm-4">';
$htm[] = '<div class="form-group">';
$htm[] = '<label for="cc_num">CC#</label>';
$htm[] = '<select class="form-control" id="cc_num">';
for($i=0;$i<127;$i++){
	$htm[] = '<option value=$i>'.($i+1).'</option>';
}
$htm[] = '</select>';
$htm[] = '</div>';

$htm[] = '</div>';
$htm[] = '</div>';




$box=new LTE\Box;
$box->title("Settings/Filter");
$box->id("boxSettings");
$box->icon("fa fa-cog");
$box->body($htm);
echo $box;