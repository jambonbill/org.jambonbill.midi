<?php
/**
 * Box filters
 * @var array
 */

$items=[];
$items[]=[0x80,'Note off'];
$items[]=[0x90,'Note on'];
$items[]=[0xa0,'AfterTouch'];
$items[]=[0xb0,'Control Changes'];//modulation
$items[]=[0xc0,'Program Change'];
$items[]=[0xe0,'Pitch'];
$items[]=[0xf0,'Continue'];

$htm='';
foreach($items as $item){
	$htm.='<div class="checkbox">';
	$htm.='<label><input type="checkbox" class=filters value="'.$item[0].'"> '.$item[1].'</label>';
	$htm.='</div>';
}


$box=new LTE\Card;
$box->id("boxFilters");
$box->icon("fa fa-filter");
$box->title("Event filter(s)");

//$box->boxTools("<button class=\"btn btn-box-tool\" title='Clear'><i class='fa fa-times'></i></button> ");
$box->body($htm);

// buttons //
$btns='<div class="btn-group btn-group-sm" role="group" aria-label="First group">
    <button type="button" class="btn btn-default">1</button>
    <button type="button" class="btn btn-default">2</button>
    <button type="button" class="btn btn-default">3</button>
    <button type="button" class="btn btn-default">4</button>
    <button type="button" class="btn btn-default">5</button>
    <button type="button" class="btn btn-default">6</button>
    <button type="button" class="btn btn-default">7</button>
    <button type="button" class="btn btn-default">8</button>
    <button type="button" class="btn btn-default">9</button>
    <button type="button" class="btn btn-default">10</button>
  </div>';

$box->footer($btns);
//$box->collapsable(1);
$box->loading(1);
echo $box;
