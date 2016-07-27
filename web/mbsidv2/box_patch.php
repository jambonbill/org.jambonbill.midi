<?php

$box=new LTE\Box;
$box->title("Patch");
$box->icon("fa fa-file-o");
$box->id("boxPatch");
$box->collapsable(true);
$box->body("please wait");

$btns=[];
$btns[]="<a href=#btn class='btn btn-default' id=btnOpen><i class='fa fa-folder-o'></i></a> ";
$btns[]="<a href=#btn class='btn btn-default' id=btnSave><i class='fa fa-save'></i> Save</a> ";
$btns[]="<a href=#btn class='btn btn-default pull-right' id=btnSend><i class='fa fa-send-o'></i> Send</a> ";

$box->footer($btns);
echo $box;

$modal=new LTE\Modal;
$modal->title("Patches");
echo $modal;

?>
<script>
$(function(){
	$('#btnSave').click(function(){
		console.log('save');
	});

	$('#btnSend').click(function(){
		
		console.log('btnsend');
		
		var _portId=$.midiPortId();
		
		if (!_portId) {
			console.warn('!portid');
			return;
		}
		
		var device_number=0x00;
		//var output = $.midiAccess().outputs.get(_portId);
		var output = $.midiOutput();
		var dat=patchBin();
		output.send( dat );

	});

});
</script>