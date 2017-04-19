$(function(){
	
	'use strict';
	
	$.onMIDIInit=function(midi) {

        midiAccess = midi;
        //console.info('midi init!', midiAccess);
        displayInputs();
        displayOutputs();
    }


    $.onMIDIReject=function(err) {
        console.error(err);
        alert("The MIDI system failed to start");
    }

    function displayInputs(){
		//console.info('displayInputs()');
		var htm='<table class="table table-hover" style="cursor:pointer">';
		htm+='<thead>';
		htm+='<th>Name</th>';
		htm+='<th>Manufacturer</th>';
		//htm+='<th>State</th>';
		htm+='</thead>';

		htm+='<tbody>';
		var ins=$.midiInputs();
		for(var i in ins){
			var o=ins[i];
			//console.log(o);
			htm+='<tr title="'+o.id+'">';
			htm+='<td>'+o.name;
			htm+='<td>'+o.manufacturer;
			//htm+='<td>'+o.state;
		}
		htm+='</tbody>';

		if(ins.length==0){
			htm='<pre>none</pre>';
		}

		$('#boxInputs .box-body').html(htm);
		$('#boxInputs table').tablesorter();
		$('#boxInputs .overlay').hide();
    }

    function displayOutputs(){
    	//console.info('displayOutputs()');
		var htm='<table class="table table-hover" style="cursor:pointer">';
		htm+='<thead>';
		htm+='<th>Name</th>';
		htm+='<th>Manufacturer</th>';
		//htm+='<th>State</th>';
		htm+='</thead>';

		htm+='<tbody>';
		var out=$.midiOutputs();
		for(var i in out){
			var o=out[i];
			//console.log(o);
			htm+='<tr title="'+o.id+'">';
			htm+='<td>'+o.name;
			htm+='<td>'+o.manufacturer;
			//htm+='<td>'+o.state;
		}
		htm+='</tbody>';
		if(out.length==0){
			htm='<pre>none</pre>';
		}
		$('#boxOutputs .box-body').html(htm);
		$('#boxOutputs .overlay').hide();
		$('#boxOutputs table').tablesorter();
    }

    $('#btnRefresh1,#btnRefresh2').click(function(){
    	displayInputs();
    	displayOutputs();
    });

    console.log('home.js',midiAccess);
});