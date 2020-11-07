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

        function listInputs(){
            _midiInputs=[];
            let inputs=midi.inputs.values();
            for ( let input = inputs.next(); input && !input.done; input = inputs.next()) {
            	input.value.onmidimessage = onMIDIMessage;
                _midiInputs.push(input.value);
            }
            return true;
        }

        function listOutputs(){
            _midiOutputs=[];
            let outputs=midi.outputs.values();
            for ( let output = outputs.next(); output && !output.done; output = outputs.next()) {
                _midiOutputs.push(output.value);
            }
            return true;
        }

		listInputs();
        listOutputs();

        if (!_midiOutputs){
            console.warn("No MIDI output device present.");
        }else{
            console.info('MIDI ready');
            _midiReady=true;
            init();//init APP
        }

        midi.onstatechange=function(d){
            if(!_midiReady)return false;
            let p=d.port;
            console.info(p.type, p.name, p.connection);
            //console.log("onstatechange d",d.port);
            listInputs();
            listOutputs();
            //displayInputs();
    		displayOutputs();
        };
    }


    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
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


	function bankChange(chan, MSB, LSB){

            // A Bank change is made of two Control messages.
            // actually, just one (LSB) should be enough
			console.log('bankChange', chan, MSB, LSB);

            if(!_portId){
                console.warn('!portID');
                return false;
            }



            let output = _midiAccess.outputs.get(_portId);
            output.send( [0xB0+chan, 0x00, MSB] );
            output.send( [0xB0+chan, 0x20, LSB] );
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
	            $('#boxLog .card-body').html("<i class='fa fa-warning'></i> Select midi output");
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

				htm='<i class="text-muted">'+midiNoteToString(midinote) + " midinote("+midinote+") on channel "+_midiChannel+'</i>';
	            let chord=readChord();
	            if(chord){
	            	htm+="<br /><lryi>Chord:"+chord;
	            }
	            $('#boxLog .card-body').html(htm);

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


		$('#btnBank').click(function(){
			let n=prompt("Bank number (0-127)", 0);
			if (n>=0&&n<(128*128)) {
				console.log("bankChange(0,"+n+");");
				let MSB=Math.floor(n/128);
				let LSB=n%128;
				bankChange(0, MSB, LSB);
			}
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
		//$('select#outputs').dblclick(()=>selectOutput());
		//$('#btnSelectOutput').click(()=>selectOutput());
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
		displayOutputs();
    }

    function displayOutputs(){

        console.info('displayOutputs()');
        let dat=_midiOutputs;

        let htm='<table class="table table-sm table-hover" style="cursor:pointer">';
        let num=0;

        htm+='<thead>';
        htm+='<th width=20>#</th>';
        htm+='<th>Output name</th>';
        htm+='</thead>';

        htm+='<tbody>';
        for(let i in dat){

            let o=dat[i];
            //console.log(o);
            htm+='<tr data-id="'+o.id+'" title="'+o.id+'">';
            htm+='<td><i class="text-muted">'+i;
            //htm+='<td>'+o.id;
            htm+='<td>'+o.name;

            if (o.manufacturer) {
            	htm+=' <i class="text-muted">'+o.manufacturer+'</i>';
            }

            num++;
        }
        htm+='</tbody>';
        htm+='</table>';

        if (num>0) {
            //htm+='<i class="text-muted">'+dat.length+' record(s)</i>';
        } else {
    		htm='<div class="p-4"><div class="alert alert-secondary" role="alert">no data</div></div>';
        }


        $('#modalMIDIOutput .modal-body').html(htm);
        $('#modalMIDIOutput table').tablesorter();
        $('#modalMIDIOutput tbody>tr').click(function(){
        	//$('.overlay').show();
            console.log($(this).data('id'));
            selectOutput($(this).data('id'));
        });
    }

	function selectOutput(pid){
		//let id=$('select#outputs').val();
		console.log("selectOutput(pid)", pid);
		$('#modalMIDIOutput').modal('hide');

		let selectId=false;
		for(let i in _midiOutputs){
			let o=_midiOutputs[i];
			if (o.id==pid) {
				_portId=pid;
				localStorage.setItem('keyboardPortId', _portId);
				selectId=_portId;
				$('#btnMIDIOutput').text(o.name);
				$('#btnMIDIOutput').attr('disabled',false);
			}
		}
		return selectId;
	}


	/*
    http://www.gweep.net/~prefect/eng/reference/protocol/midispec.html
    Messages :
    8 = Note Off
    9 = Note On
    A = AfterTouch (ie, key pressure)
    B = Control Change
    C = Program (patch) change
    D = Channel Pressure
    E = Pitch Wheel
     */
    var continues=0;//bpm counter
    function onMIDIMessage(event) {
        //var msg=event.data[0] & 0xf0;
        var msg=event.data[0];
        let chan=msg & 0x0f;
        var type=msg & 0xf0;
        let B1=event.data[1];
        let B2=event.data[2];

        console.log(event.data);

        if(_portId){
        	let output = _midiAccess.outputs.get(_portId);
			//let msg = [0xc0+midiChannel, n];
			//output.send( event.data );//forward input to output (warning, may create some loops)
        }else{
        	//
        }

    }

});