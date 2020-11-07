<?php

$htm=[];
$htm[]='<textarea class="form-control" id=midinfo rows=8></textarea>';

$modal=new LTE\Modal;
$modal->id('modalFile');
$modal->icon('fa fa-file-o');
$modal->title('midifile');
$modal->body($htm);

$btn=[];
$btn[]='<a href=#btn class="btn btn-default" data-dismiss=modal>Download</a>';
$btn[]='<a href=#btn class="btn btn-default" data-dismiss=modal>Close</a>';

$modal->footer($btn);

echo $modal;

/*
MIDI file: MIGM11.MID
Format: 1  Tracks: 17  Divisions: 192
Track name:    THE SECRET OF
Track name:    MONKEY ISLAND
Track name:  Copyright (c)1990
Track name:      LucasArts
Track name: ====================
Track name:
Track name:     THE JOURNEY
Track name:   Michael Z. Land
Track name:
Track name: ====================
Track name: Recorded by:
Track name:    QUEST STUDIOS
Track name:
Track name: GENERAL MIDI VERSION
Track name:
Track name: www.QuestStudios.com
channel 17 => 1
channel 18 => 2
channel 19 => 3
channel 20 => 4
channel 21 => 5
channel 25 => 9
*/