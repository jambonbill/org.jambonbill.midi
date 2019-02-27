// jambonbill midi.keyboard
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

$(function(){

	'use strict';

	let _midiAccess=null;  // the MIDIAccess object.
	let _midiChannel=0;
	let _midiInputs;
	let _midiOutputs;
	let _midiReady=false;
	let _portId='';
	let _octave=3;
	let _prg=0;//current prg
	let _notes=[];// note buffer (being played)
	let _notestr=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];

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
        for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
            //console.log("input",input);
            input.value.onmidimessage = MIDIMessageEventHandler;
            haveAtLeastOneDevice = true;
            _midiInputs.push({'id':input.value.id,'name':input.value.name});

        }
  		_midiOutputs=[];
        for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
            _midiOutputs.push({'id':output.value.id,'name':output.value.name});
        }

        if (!haveAtLeastOneDevice){
            console.warn("No MIDI input devices present.");
        }else{
            console.info('MIDI ready');
            _midiReady=true;
            init();//init APP
        }
    }


    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
    }


    /*
    0x80     Note Off
    0x90     Note On
    0xA0     Aftertouch
    0xB0     Continuous controller
    0xC0     Patch change
    0xD0     Channel Pressure
    0xE0     Pitch bend
    0xF0     (non-musical commands)
    */
    function MIDIMessageEventHandler(event) {//incoming midi events

        var msg=event.data[0] & 0xf0;
        //if(msg==240)return; //??
        var midichannel=event.data[0] & 0x0f;

        // Mask off the lower nibble (MIDI channel)
        switch (event.data[0] & 0xf0) {


            case 0x80://note off
                return;


            case 0x90://note on
                break;

            case 0xb0:// CC - Control Change
                break;

            case 0xC0:// Prg Change
                break;

            case 0xe0://pitch
                break;

            case 0xf0:// Other (time)
                break;

            default:
                break;
        }
    }


	function prgChange(n,midiChannel){

		console.log('prgChange',n,midiChannel);

		if(!n){
			console.warn('!n');
			return;
		}

		if(!midiChannel){
			midiChannel=_midiChannel;
		}

		let output = _midiAccess.outputs.get(_portId);
		let msg = [0xc0+midiChannel, n];
		output.send( msg );
		_prg=n;
	}


	function midiNoteToString(n){
	    let note=n%12;
	    let notes=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
	    let oct=Math.floor(n/12);
	    return notes[note]+oct;
	}

	function noteOn(noteNumber, midiChannel){

		if(!_portId){
			console.warn('noteOn() !portId');
			return;
		}

		if(!noteNumber){
			console.warn('noteOn() !noteNumber');
			return;
		}

		if(!midiChannel)midiChannel=_midiChannel;

		for(let i=0;i<_notes.length;i++){
			if(_notes[i]==noteNumber)return;//dont play it twice
		}

		//console.log('noteOn() '+midiNoteToString(noteNumber), noteNumber, midiChannel);
		let noteOnMessage = [0x90+midiChannel, noteNumber, 0x7f];    // note on, middle C, full velocity
		let output = _midiAccess.outputs.get(_portId);
		output.send( noteOnMessage );
		_notes.push(noteNumber);
	}

	function noteOff(noteNumber, midiChannel){

		if(!_portId){
			console.warn('!_portId');
			return;
		}

		if(!_portId||!noteNumber){
			//console.warn(!_portId||!noteNumber);
			return;
		}

		if(!midiChannel)midiChannel=_midiChannel;

		//console.log('noteOff()', noteNumber, midiChannel);

		let output = _midiAccess.outputs.get(_portId);


		output.send( [0x80+midiChannel, noteNumber, 0x40]);// note off

		// remove from the note buffer
		let nn=[];
		for(let i=0;i<_notes.length;i++){
			if(_notes[i]!=noteNumber)nn.push(_notes[i]);
		}
		_notes=nn;
	}

	/**
	 * Kill all notes on current channel
	 * @return {[type]} [description]
	 */
	function midiPanic(midiChannel){
		console.info('midiPanic()');
		_notes=[];
		for (var i=0;i<128;i++) {
			noteOff(i,+midiChannel);
		}
	}



    window.selectMidiChannel=function(n)
    {
    	console.info('selectMidiChannel('+n+')');
    	_midiChannel=+n;
    	$('ul>li').removeClass("active");
	    //$(this).addClass("active");
	    $("ul").find("[data-channel='" + n +"']").addClass("active");

    }


    function init(){

    	console.info('init');

		// Keyboard //
		$("body").keydown(function(e) {

	        if (!_portId) {
	            $('#boxLog .box-body').html("<i class='fa fa-warning'></i> Select midi output");
	            $('#midi_outputs').focus();
	            return;
	        }

	        $('#keyname').val('test');
	        $('#keycode').val(e.keyCode);

	        let htm='Key:'+e.keyCode;
			let n=keyCodeToMidiNote(e.keyCode);

			if (typeof(n)=='number') {

				let nid=n%12;
				let oct=Math.floor(n/12);
				let midinote=n+(+_octave*12);
				noteOn(midinote,_midiChannel);

				htm=midiNoteToString(midinote) + " midinote("+midinote+") on channel "+_midiChannel;
	            let chord=readChord();
	            if(chord){
	            	htm+="<br /><lryi>Chord:"+chord;
	            }
	            $('#boxLog .box-body').html(htm);

			} else {

	            if (e.keyCode>=112&&e.keyCode<=115) {//F1234-Keys

	                console.log("F"+e.keyCode);
	                setOctave(e.keyCode-111);
	                e.stopPropagation();
	                e.preventDefault();
	                return;
	            }

	            switch(e.keyCode){

	                case 27://ESC
	                    midiPanic();
	                    break;

	                default:
	                	console.warn("Key:"+e.keyCode+" not mapped !");
	                	break;
	            }
			}
		});

		window.readChord=function(){//try to compute chord 'string'

			if(_notes.length<2)return;
			_notes.sort();
			//console.log(_notes);
			let arp=[];
			arp.push(0);
			let f=_notes[0];
			for(let i=1;i<_notes.length;i++){
				let t=_notes[i];
				let d=t-f;
				arp.push(d);
			}
			return arp.join(',');
		}

		$("body").keyup(function(e) {
			let n=keyCodeToMidiNote(e.keyCode);
			noteOff(n+(_octave*12),_midiChannel);
		});


		// Midi channel selector //
	    $('ul>li').click(function(e){
	    	selectMidiChannel(e.currentTarget.dataset.channel);
	    	//$('ul>li').removeClass("active");
	    	//$(this).addClass("active");
	    });

    	$('#btnTest').click(function(){
			noteOn(60,_midiChannel);
			setTimeout(function(){
				noteOff(60,_midiChannel);
			},500);
		});



		$('#btnMidiPanic').click(function(){
			midiPanic(_midiChannel);
		});

		$('#prgs').change(function(){
			console.info("$('#prgs').change");
			prgChange(+$('#prgs').val(),_midiChannel);
		});


		$('select#octave').attr('disabled',false);
		$('select#prgs').attr('disabled',false);
		//$('#btnSelectOutput').attr('readonly',false);
		$('select#outputs').dblclick(()=>selectOutput());
		$('#btnSelectOutput').click(()=>selectOutput());
		$('#btnMIDIOutput').click(popMidiOutput);

		let pid=localStorage.getItem('keyboardPortId');
		if(pid){
			selectOutput(pid);
		}
    }

    $('select#octave').change(function(){
    	setOctave($('select#octave').val());
    });

    window.setOctave=function(oct){
		console.log('setOctave',oct);
    	$('select#octave').val(oct);
    	_octave=oct;
    }


	window.popMidiOutput=function(){
		//console.log('popMidiOutput', portId);
		$('#modalMIDIOutput').modal('show');
		$('select#outputs').empty();
		let selectId=null;
	    for(let i in _midiOutputs){
	        let o=_midiOutputs[i];
	        $('select#outputs').append($('<option>', {value:o.id,text:o.name}));
	    }
	    if(_midiOutputs.length>4){
	    	$('select#outputs').attr('size', _midiOutputs.length);
	    }
	    $('select#outputs').focus();
    }

	function selectOutput(pid){

		let id=$('select#outputs').val();

		console.log("Select port id#", id, pid);

		if(pid){
			id=pid;
		}

		$('#modalMIDIOutput').modal('hide');

		let selectId=false;
		for(let i in _midiOutputs){
			let o=_midiOutputs[i];
			if(o.id==id){
				_portId=id;
				localStorage.setItem('keyboardPortId', _portId);
				selectId=_portId;
				$('#btnMIDIOutput').text(o.name);
				$('#btnMIDIOutput').attr('disabled',false);
			}
		}
		return selectId;
	}

});