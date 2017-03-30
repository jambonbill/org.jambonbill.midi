// jambonbill opafm.js
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

$(function(){
	$('input').change(function(e){
		var val=e.currentTarget.value;
		console.info('change',"value="+val);
	});

	$('#btnOpen').click(function(){
		console.info('btnOpen');
	});

	$('#btnSave').click(function(){
		console.info('btnSave');
	});


	console.info("opafm.js");
});