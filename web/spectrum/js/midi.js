






$(function(){
	
	var context=null;   // the Web Audio "context" object
	var midiAccess=null;  // the MIDIAccess object.
	
	var _portId='';
	var _octave=3;
	

	function onMIDIInit(midi) {
		
		//console.log('onMIDIInit(midi)',midi);
		midiAccess = midi;

		var outputs=midiAccess.outputs.values();
		
		var options=[];
		for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
			options.push(output.value);
		}  

		for(var i in options){
			//var x = document.getElementById("midi_outputs");
			//var option = document.createElement("option");
			//option.value = options[i].id;
			//option.text = options[i].name;
			//x.add(option);
			console.log(options[i]);
		}

		if (options.length==0) {
			console.error("No MIDI output devices present");
			$('#midi_outputs').attr('disabled','disabled');
	        return;
		}else{
			$('#midi_outputs').attr('disabled',false);
			$('#midi_outputs').attr('size',options.length);
		}
		
	    /*
	    if ($.cookie('midi_portId')) {
	        _portId=$.cookie('midi_portId'); 
	        setPortId(_portId);
	    }else{
	        $('#boxLog .box-body').html('Midi ready. Select midi output');    
	        $('#midi_outputs').focus();
	    }
		*/
	}


	function onMIDIReject(err) {
		console.error("The MIDI system failed to start.");
		$('#midi_outputs').attr('disabled','disabled')
	}


	function setPortId(id){
		
		console.info('setPortId()',id);
	    
	    //here we should make sure the portId is available
	    
	    _portId=id;
	    
	    $.cookie('midi_portId', _portId);
	    
	    $('#boxLog .box-body').html("Output : "+_portId);
	    $('#midiChannel,#octave,#prgs').attr('disabled',false);
	    $("#midi_outputs").val(_portId);
	}



	function noteOn(noteNumber,midiChannel)
	{
		
		if(!_portId){
			console.warn('noteOn() !portId');
			return;
		}
		
		if(!noteNumber){
			console.warn('noteOn() !noteNumber');
			return;	
		}
		
		for(var i=0;i<_notes.length;i++){
			if(_notes[i]==noteNumber){
				//console.warn("Already playing !");
				return;//dont play it twice
			}
		}
		
		console.log('noteOn()',noteNumber,midiChannel);
		
		var noteOnMessage = [0x90+midiChannel, noteNumber, 0x7f];    // note on, middle C, full velocity
		var output = midiAccess.outputs.get(_portId);
		output.send( noteOnMessage );
		_notes.push(noteNumber);
	}

	
	function noteOff(noteNumber,midiChannel)
	{
		
		if(!_portId||!noteNumber){
			console.warn(!_portId||!noteNumber);
			return;
		}
		
		console.log('noteOff()',noteNumber,midiChannel);
		
		//var midiChan=+$('#midiChannel').val();
		var output = midiAccess.outputs.get(_portId);
		
		// note off
		output.send( [0x80+midiChannel, noteNumber, 0x40]);

		// remove from the note buffer
		var nn=[];
		for(var i=0;i<_notes.length;i++){
			if(_notes[i]!=noteNumber)nn.push(_notes[i]);
		}
		_notes=nn;
	}
	
	

	 /*
	$("#midi_outputs").change(function(e){
        setPortId($("#midi_outputs").val());
	});
    */


    // patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();

    if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    else
        console.warn("No MIDI support present in your browser")


});
