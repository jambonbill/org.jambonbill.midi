<?php

$htm="<table class='table table-condensed'>";
$htm.="<thead>";
$htm.="<th>Channel</th>";
$htm.="<th>Playing</th>";
$htm.="</thead>";
$htm.="<tbody>";

for($i=0;$i<16;$i++){
	$htm.="<tr>";	
	$htm.="<td>".($i+1);
	$htm.="<td id=voice_$i>-";
}
$htm.="</tbody>";
$htm.="</table>";


$box=new LTE\Card;
$box->title("Preview");
//$box->icon("fa fa-list");
$box->id("boxPreview");
//$box->collapsable(1);
$box->p0(1);
$box->body($htm);
echo $box;
