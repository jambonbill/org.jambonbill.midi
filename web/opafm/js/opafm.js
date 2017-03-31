// jambonbill opafm.js
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

$(function(){

	$('button.algorithm').click(function(e){
		//console.log(e.currentTarget.dataset.id);
		selectAlgorithm(e.currentTarget.dataset.id);
	});

	function selectAlgorithm(n){
		console.info('selectAlgorithm(n)',n);
		$("button.algorithm").find("[data-id='"+n+"']").removeClass('btn-default');
		$("button.algorithm").find("[data-id='"+n+"']").addClass('btn-primary');
	}

	$('input').change(function(e){
		var val=e.currentTarget.value;
		var nam=e.currentTarget.name;
		var OP=e.currentTarget.dataset.op;
		console.info('OP='+OP,"name="+nam,"value="+val);
	});

	$('#btnOpen').click(function(){
		console.info('btnOpen');
	});

	$('#btnSave').click(function(){
		console.info('btnSave');
	});

	$('#btnTest').click(function(){
		console.info('btnTest');
	});


	console.info("opafm.js");
});