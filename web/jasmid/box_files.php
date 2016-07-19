<?php



//echo "<pre>";print_r($f);echo "</pre>";
/*
$f=glob("mid/*.mid");
$htm=[];
$htm[]="<table class='table table-condensed table-hover' style='cursor:pointer'>";
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
$box->collapsed(1);
$box->body($htm);
echo $box;
*/
?>
<script>
$(function(){
	$('#boxFiles tbody>tr').click(function(e){
		console.log(e.currentTarget.dataset.filename);
		play(e.currentTarget.dataset.filename)
	});
});
</script>