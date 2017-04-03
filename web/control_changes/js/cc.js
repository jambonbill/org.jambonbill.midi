// jambonbill cc.js

$(function(){

	$('input').change(function(e){
		var val=e.currentTarget.value;
		var nam=e.currentTarget.name;
		var OP=e.currentTarget.dataset.op;
		console.info('OP='+OP,"name="+nam,"value="+val);
	});

	/*
	$('#btnOpen').click(function(){
		console.info('btnOpen');
	});

	$('#btnSave').click(function(){
		console.info('btnSave');
	});

	$('#btnTest').click(function(){
		console.info('btnTest');
	});

	*/
	console.info("cc.js");
});