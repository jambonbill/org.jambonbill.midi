<?php

$items=[];
$items[]=[0x80,'Note off'];
$items[]=[0x90,'Note on'];
$items[]=[0xa0,'AfterTouch'];
$items[]=[0xb0,'Control Changes'];//modulation
$items[]=[0xc0,'Program Change'];
$items[]=[0xe0,'Pitch'];
$items[]=[0xf0,'Continue'];

$htm=[]; 
foreach($items as $item){
	
	$htm[]='<div class="checkbox">';
	$htm[]='<label><input type="checkbox" class=filters value="'.$item[0].'">'.$item[1].'</label>';
	$htm[]='</div>';
}
    


$box=new LTE\Card;
$box->title("Event filter(s)");
$box->icon("fa fa-filter");
$box->id("boxFilters");
//$box->boxTools("<button class=\"btn btn-box-tool\" title='Clear'><i class='fa fa-times'></i></button> ");
$box->collapsable(1);
$box->collapsed(1);
$box->body($htm);
echo $box;
