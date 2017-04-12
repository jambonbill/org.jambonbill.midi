// jambonbill opafm.js
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript
$(function(){

	$.onMIDIInit=function(midi) {                    
        midiAccess = midi;
        
        $('.overlay').hide();
    }

	

    $.onMIDIReject=function(err) {
        console.error("The MIDI system failed to start.",err);
        alert("The MIDI system failed to start");
    }

	$('button.algorithm').click(function(e){
		//console.log(e.currentTarget.dataset.id);
		selectAlgorithm(e.currentTarget.dataset.id);
	});

	function selectAlgorithm(n){
		console.info('selectAlgorithm(n)',n);
		$("button.algorithm").find("[data-id='"+n+"']").removeClass('active');
		$("button.algorithm").find("[data-id='"+n+"']").addClass('active');
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