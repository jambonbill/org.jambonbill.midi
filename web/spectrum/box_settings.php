<?php
// spectrum input analyser settings

$htm=[];

// MIDI Output
$htm[] = '<div class="form-group">';
$htm[] = '<label for="title">Midi out</label>';
$htm[] = '<input type="text" class="form-control" id="midi_out">';
$htm[] = '</div>';

// MIDI Chn
$htm[] = '<div class="form-group">';
$htm[] = '<label for="title">Midi Chn</label>';
$htm[] = '<input type="text" class="form-control" id="midi_chan">';
$htm[] = '</div>';

// CC
$htm[] = '<div class="form-group">';
$htm[] = '<label for="cc_num">CC</label>';
$htm[] = '<input type="text" class="form-control" id="cc_num">';
$htm[] = '</div>';


$box=new LTE\Box;
$box->title("Settings/Filter");
$box->id("boxSettings");
$box->icon("fa fa-cog");
$box->body($htm);
echo $box;