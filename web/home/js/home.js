$(function(){
	
	'use strict';
	
	let _midiAccess=null;  // the MIDIAccess object.
	let _midiChannel=0;
	let _midiInputs;
	let _midiOutputs;
	let _midiReady=false;

	if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    }else{
        console.warn("No MIDI support present in your browser");
    }

    function onMIDIInit(midi) {
        //console.log('onMIDIInit(midi)',midi);
        _midiAccess = midi;

        var haveAtLeastOneDevice=false;
        var inputs=_midiAccess.inputs.values();
        var outputs=_midiAccess.outputs.values();
    	
    	_midiInputs=[];
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            haveAtLeastOneDevice = true;
            _midiInputs.push(input.value);

        }
  		_midiOutputs=[];
        for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
        	console.log(output);
            _midiOutputs.push(output.value);
        }

        if (!haveAtLeastOneDevice){
            console.warn("No MIDI input devices present.");
        }else{
            console.info('MIDI ready');
            _midiReady=true;
            displayInputs();
    		displayOutputs();
        }
    }

       
    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
    }

    function displayInputs(){
		//console.info('displayInputs()');
		let htm='<table class="table table-sm table-hover" style="cursor:pointer">';
		htm+='<thead>';
		htm+='<th>Name</th>';
		htm+='<th>Manufacturer</th>';
		//htm+='<th>State</th>';
		htm+='</thead>';

		htm+='<tbody>';
		var ins=_midiInputs;
		for(let i in ins){
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
		let htm='<table class="table table-sm table-hover" style="cursor:pointer">';
		htm+='<thead>';
		htm+='<th>Name</th>';
		htm+='<th>Manufacturer</th>';
		//htm+='<th>State</th>';
		htm+='</thead>';

		htm+='<tbody>';
		
		for(let i in _midiOutputs){
			let o=_midiOutputs[i];
			console.log(o);
			htm+='<tr title="'+o.id+'">';
			htm+='<td>'+o.name;
			htm+='<td>'+o.manufacturer;
			//htm+='<td>'+o.state;
		}
		htm+='</tbody>';
		if(_midiOutputs.length==0){
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

    console.log('home.js', _midiAccess);
});