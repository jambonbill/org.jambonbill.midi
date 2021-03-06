$(function(){
	
	var context=null;   // the Web Audio "context" object
	var midiAccess=null;  // the MIDIAccess object.
	
	var _portId='';
	var _octave=3;
	var _prg=0;//current prg
	var _notes=[];// note buffer (being played)
	var _notestr=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
	
	var kmap=[];// Keyboard mapping
	// QWERTY //
	kmap[90]='0';// Z - Octave 1
	kmap[83]=1;// S
	kmap[88]=2;// X
	kmap[68]=3;// D
	kmap[67]=4;// C
	kmap[86]=5;// V
	kmap[71]=6;// G
	kmap[66]=7;// B
	kmap[72]=8;// H
	kmap[78]=9;// N
	kmap[74]=10;// J
	kmap[77]=11;// M
	kmap[188]=12;// <
	kmap[190]=14;// <
	
	kmap[81]=12;// Q - Octave 2
	kmap[50]=13;// 2 - Octave 2
	kmap[87]=14;// W - Octave 2
	kmap[51]=15;// 3 - Octave 2
	kmap[69]=16;// E - Octave 2
	kmap[82]=17;// R - Octave 2
	kmap[53]=18;// 5 - Octave 2
	kmap[84]=19;// T - Octave 2
	kmap[54]=20;// 6 - Octave 2
	kmap[89]=21;// Y - Octave 2
	kmap[55]=22;// 7 - Octave 2
	kmap[85]=23;// U - Octave 2
	kmap[73]=24;// I - Octave 3
	kmap[57]=25;// 9 - Octave 3
	kmap[79]=26;// O - Octave 3
	kmap[48]=27;// 0 - Octave 3
	kmap[80]=28;// P - Octave 3
	kmap[219]=29;//
	kmap[221]=31;//
	
	function keyCodeToMidiNote(keyCode)
	{
		var n=kmap[keyCode];
		if (n) return n;	
	}


	function onMIDIInit(midi) {
		
		//console.info('onMIDIInit(midi)',midi);
		midiAccess = midi;

		var outputs=midiAccess.outputs.values();
		
		var options=[];
		for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
			options.push(output.value);
		}  
		//console.log(options);
		

		for(var i in options){
			var x = document.getElementById("midi_outputs");
			/*
			var option = document.createElement("option");
			option.value = options[i].id;
			option.text = options[i].name;
			x.add(option);
			*/
			//console.info("Output #"+i,options[i].name);
		}
		/*
		if (options.length==0) {
			console.error("No MIDI output devices present");
			$('#midi_outputs').attr('disabled','disabled');
	        return;
		}else{
			$('#midi_outputs').attr('disabled',false);
			$('#midi_outputs').attr('size',options.length);
		}
		
	    
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
		//$('#midi_outputs').attr('disabled','disabled')
	}


	function setPortId(id){
		
		console.info('setPortId()',id);
	    
	    //here we should make sure the portId is available
	    
	    _portId=id;
	    
	    $.cookie('midi_portId', _portId);
	    
	    //$('#boxLog .box-body').html("Output : "+_portId);
	    //$('#midiChannel,#octave,#prgs').attr('disabled',false);
	    //$("#midi_outputs").val(_portId);
	}


	function prgChange(n,midiChannel){

		if(!n){
			console.warn('!n');
			return;
		}
		
		var output = midiAccess.outputs.get(_portId);
		var msg = [0xc0+midiChannel, n];
		output.send( msg );
		_prg=n;
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
	
	
	/**
	 * Kill all notes on current channel
	 * @return {[type]} [description]
	 */
	function midiPanic(midiChannel)
	{
		console.info('midiPanic()');
		_notes=[];
		for (var i=0;i<128;i++) {
			noteOff(i,+midiChannel);
		}
	}


    function setOctave(n){
    	_octave=+n;
        console.info("Octave "+_octave);
        $("#octave").val(_octave);
    }


    // patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();

    if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    else
        console.warn("No MIDI support present in your browser")


});
