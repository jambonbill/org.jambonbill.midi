<?php
// Modal MIDI out //

$htm='<div class="row">';

$htm.='<div class="col-12">';
$htm.='<div class="form-group">';

//$htm.='<label>MIDI outputs:</label>';
$htm.='<select class="form-control form-control-sm" id="outputs" size=4>';
$htm.='<option>Test';
$htm.='</select>';
$htm.='<i class="text-muted">select midi output</i>';

$htm.='</div>';
$htm.='</div>';

$htm.='</div>';

$modal=new LTE\Modal;
$modal->id('modalMIDIOutput');
$modal->title('MIDI outputs');
//$modal->icon('fa-save');
$modal->body($htm);

$btns=[];
$btns[]='<a href=# class="btn btn-sm btn-primary" id="btnSelectOutput">Select</a>';
$btns[]='<a href=# class="btn btn-sm btn-default" data-dismiss=modal><i class="fa fa-times"></i> Cancel</a>';

$modal->footer($btns);
echo $modal;