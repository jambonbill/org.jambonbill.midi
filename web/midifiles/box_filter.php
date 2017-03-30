<?php
//box filter

$htm ='<div class="row">';
$htm.='<div class="col-sm-4">';
$htm.='<input class="form-control" placeholder="Search">';
$htm.='</div>';
$htm.='</div>';

$box=new LTE\Box;
$box->title("Search");
$box->icon("fa fa-search");
$box->id("boxFilter");
$box->collapsable(true);
$box->body($htm);
$box->footer('<a href=# class="btn btn-default" id=btnUpload><i class="fa fa-upload"></i> Upload midi file</a>');
echo $box;
