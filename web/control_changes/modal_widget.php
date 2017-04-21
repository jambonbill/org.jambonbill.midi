<?php
$htm ='<input type=hidden id=wnum>';

$htm.='<div class=row>';


// Name
$htm.='<div class="col-sm-12">';
$htm.='<div class="form-group">';
	$htm.='<label>Widget name</label>';
	$htm.='<input type=text class="form-control" id=ccname placeholder=name maxlength=16>';
$htm.='</div>';
$htm.='</div>';


// Widget Tipye
$htm.='<div class="col-sm-3">';
$htm.='<div class="form-group">';
	$htm.='<label>Type</label>';
	$htm.='<select id=wtype class="form-control">';
	$htm.='<option value="range">Range</option>';
	$htm.='<option value="button">Button</option>';
	$htm.='</select>';
$htm.='</div>';
$htm.='</div>';


// CCNumber
$htm.='<div class="col-sm-2">';
$htm.='<div class="form-group">';
	$htm.='<label>CC#</label>';
	$htm.='<input type=text id=ccnumber class="form-control" placeholder=CC# style="text-align:right">';
$htm.='</div>';
$htm.='</div>';

// CCNumber
$htm.='<div class="col-sm-2">';
$htm.='<div class="form-group">';
	$htm.='<label>Value</label>';
	$htm.='<input type=text id=ccvalue class="form-control" placeholder=Value style="text-align:right">';
$htm.='</div>';
$htm.='</div>';

// Midi channel
$htm.='<div class="col-sm-2">';
$htm.='<div class="form-group">';
	$htm.='<label>Channel</label>';
	$htm.='<select class="form-control" id=ccchannel>';
	$htm.='<option value=-1>Global</option>';
	for($i=0;$i<16;$i++){
		$htm.='<option value='.$i.'>'.($i+1).'</option>';
	}
	$htm.='</select>';
$htm.='</div>';
$htm.='</div>';

$htm.='<div class="col-sm-3">';//Color
$htm.='<div class="form-group">';
	$htm.='<label>Color</label>';
	//$htm.='<input type=text class="form-control" placeholder="Color" id=cccolor>';
	$htm.='<select id="colorselector">';
    $htm.='<option value="#EEEEEE" data-color="#EEEEEE">white</option>';
    $htm.='<option value="#519839" data-color="#519839">#519839</option>';
    $htm.='<option value="#F2D600" data-color="#F2D600">#F2D600</option>';
    $htm.='<option value="#FFAB4A" data-color="#FFAB4A">#FFAB4A</option>';
    $htm.='<option value="#EB5A46" data-color="#EB5A46">#EB5A46</option>';
    $htm.='<option value="#C377E0" data-color="#C377E0">#C377E0</option>';
    $htm.='<option value="#0079BF" data-color="#0079BF">#0079BF</option>';
	$htm.='</select>';
$htm.='</div>';
$htm.='</div>';


$htm.='</div>';//endrow


$htm.='<div class=row>';//New row

$htm.='<div class="col-sm-6">';//Comment
$htm.='<div class="form-group">';
	$htm.='<label>Comment</label>';
	$htm.='<input type=text class="form-control" placeholder="Comment" id=cccomment>';
$htm.='</div>';
$htm.='</div>';

$htm.='</div>';//endrow


$modal=new LTE\Modal;
$modal->id('modalWidget');
$modal->title('Edit');
$modal->body($htm);

$btns=[];
$btns[]='<a href=#btn class="btn btn-default" id=btnUpdate><i class="fa fa-save"></i> Update</a>';
$btns[]='<a href=#btn class="btn btn-default" title="Delete CC Widget" id=btnDelete><i class="fa fa-times"></i></a>';
$btns[]='<a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>';

$modal->footer($btns);
echo $modal;