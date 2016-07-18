<?php

$f=glob("mid/*.mid");
//echo "<pre>";print_r($f);echo "</pre>";

$htm=[];
$htm[]="<table class='table table-condensed table-hover'>";
$htm[]="<thead>";
$htm[]="</thead>";
$htm[]="<tbody>";
foreach($f as $file){
	$htm[]='<tr data-filename="'.$file.'">';
	$htm[]='<td>'.$file;
}
$htm[]="</tbody>";
$htm[]="</table>";

$box=new LTE\Box;
$box->title("Files");
$box->icon("fa fa-file-o");
$box->id("boxFiles");
$box->collapsable(1);
//$box->collapsed(1);
$box->body($htm);
echo $box;
?>
<script>
$(function(){
	$('#boxFiles tbody>tr').click(function(e){
		console.log(e.currentTarget.dataset.filename);
		play(e.currentTarget.dataset.filename)
	});
});
</script>