<?php
/**
 * Box sources
 * @var string
 */

$htm='<div class=row>';

$htm.='<div class="col-md-6">';
$htm.='<label>Source</label>';
$htm.='<div id=sources>sources</div>';
$htm.='</div>';

$htm.='<div class="col-md-6">';
$htm.='<label>Destination</label>';
$htm.='<div id=destinations>destinations</div>';
$htm.='</div>';

$htm.='</div>';

$box=new LTE\Card;
$box->id('boxSetup');
//$box->icon('fa fa-edit');
//$box->title('Sources');
$box->body($htm);
$box->footer('<a href=# class="btn btn-sm btn-primary"><i class="fa fa-plus-circle"></i> Create route</a>');
//$box->collapsable(1);
$box->loading(1);
echo $box;