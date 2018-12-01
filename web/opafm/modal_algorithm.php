<?php
/*
 *	Modal Algorithm
 */

$htm='';

$images=glob("img/program*.png");
foreach($images as $k=>$v){
	//echo "<li>$k - $v";
	$htm.='<button class="btn btn-sm btn-default" title="Algorithm '.($k+1).'" data-id="'.$k.'"><img src="'.$v.'"></button> ';
	if($k%4==3)$htm.='<br />';
}

$modal=new LTE\Modal;
$modal->id('modalAlgorithm');
$modal->title('Algorithm');
$modal->body($htm);
//$modal->footer('<button id=btnthis class="btn btn-default btn-sm"><i class="fa fa-save"></i> Save</button>');
echo $modal;
?>
<script type="text/javascript">
$(function(){
	'use strict';
	$('#modalAlgorithm button').click(function(){
		let id=$(this).data('id');
		selectAlgorithm(id);
	});
});
</script>