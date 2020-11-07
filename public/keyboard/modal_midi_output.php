<?php
// Modal MIDI out //

$modal=new LTE\Modal;
$modal->id('modalMIDIOutput');
$modal->title('Select MIDI output');
//$modal->icon('fa-save');
$htm='please wait';
$modal->body($htm);

$btns='';
//$btns.='<button class="btn btn-sm btn-primary" id="btnSelectOutput">Select</button>';
$btns.='<button class="btn btn-sm btn-default" data-dismiss=modal><i class="fa fa-times"></i> Cancel</button>';

$modal->footer($btns);
echo $modal;