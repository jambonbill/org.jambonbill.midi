<?php
// MODAL SYSEX 


$htm='<div class="row">';

$htm.='<div class="col-12">';
$htm.='<div class="form-group">';
$htm.='<label>Sysex file</label>';
$htm.='<input type="file" name="file" id="loadFromFile" accept=".syx" required><br />';
$htm.='</div>';
$htm.='</div>';

$htm.='</div>';


$modal=new LTE\Modal;
$modal->id('modalSysex');
$modal->title('Load sysex from file');
$modal->icon('fa fa-upload');
$modal->body($htm);

$btns='<a href=# class="btn btn-default" data-dismiss=modal>Cancel</a>';
$modal->footer($btns);
echo $modal;