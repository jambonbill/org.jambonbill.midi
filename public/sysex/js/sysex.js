$(function(){

	'use strict';

	let _midiAccess=null;  // the MIDIAccess object.
    let _midiChannel=0;
    let _midiInputs;
    let _midiOutputs;
    let _midiReady=false;
	let _sysex=[];

	if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    }else{
        console.warn("No MIDI support present in your browser");
    }

    function onMIDIInit(midi) {
        //console.log('onMIDIInit(midi)',midi);
        _midiAccess = midi;

        let haveAtLeastOneDevice=false;
        let inputs=_midiAccess.inputs.values();
        let outputs=_midiAccess.outputs.values();
        
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
            init();    
        }
    }

    function init(){
        console.log('init()');
        
        $('.overlay').hide();
    }

       
    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
    }


	$('#btnLoadSysex').click(function(){
		console.log('#btnLoadSysex');
		$('#modalSysex').modal('show');
	});

	$('#modalSysex').on('shown.bs.modal',function(){
        $('#loadFromFile').click();
    });

	$('#btnSendSysex').click(function(){

		//console.log('#btnSendSysex',_sysex);

	 	if (!_sysex||_sysex.length==0) {
			console.warn("nothing to send");
			return;
		}


		console.info("sending "+_sysex.length+" bytes");

		var _portId=$('select#midiOutput').val();
		var device_number=0x00;

		var output = midiAccess.outputs.get(_portId);
		//output.send( [0xF0,0x00,0x00,0x7E,0x4B, device_number, 0x0F,0xF7]);
		output.send( _sysex );
		console.log("sent");
		notification("Sent","n bytes sent to "+_portId);
	});

	

	$('#loadFromFile').change(function(evt) {

			$('#modalSysex').modal('hide');

			evt.stopPropagation();
			evt.preventDefault();
			var file = evt.target.files[0];
			var reader = new FileReader();
			var data = false;
			reader.onload = (function(theFile) {
				return function(e) {

					var chars  = new Uint8Array(e.target.result);
					//console.log(chars);
					_sysex=chars;
					console.log(chars.length+" bytes");

					var str='';
					for(var i=0;i<chars.length;i++){
						var s="0"+chars[i].toString(16).toUpperCase();
						str+=s.substr(0,2)+" ";//dat.push(s);
					}
					console.info("Sysex as HEX",str);
					$('textarea#midi_send').val(str);
					$('a#btnSendSysex').attr('disabled',false);
				}
			})(file);
			reader.readAsArrayBuffer(file);
		});

	$('#btnSaveSysex').click(function(){
		var content=$('#sysex_in').val();
		if(!content){
			return;
		}
		var uriContent = "data:application/octet-stream," + encodeURIComponent(content);
		newWindow = window.open(uriContent, 'new');
	});


	/*
	$.onMIDIInit=function(midi) {                
        
        midiAccess = midi;
        
        // Midi channel selector //
	    $('ul>li').click(function(e){
	    	$('ul>li').removeClass("active");
	    	$(this).addClass("active");
	    	selectMidiChannel(e.currentTarget.dataset.channel);
	    });


	    var ops=$.midiOutputs();
		for(var i in ops){
			var o=ops[i];
			var x = document.getElementById("midiOutput");
		    var option = document.createElement("option");
		    option.value = o.id;
		    option.text = o.name;
		    x.add(option);
		}

		$('select#midiOutput').attr('disabled',false);
		$('select#midiOutput').attr('readonly',false);
		$('select#octave').attr('disabled',false);
		$('select#prgs').attr('disabled',false);
		
		$('select#midiOutput').change(function(e){
			console.log(e.currentTarget.value);
			$.cookie('portId',e.currentTarget.value);
			if(e.currentTarget.value){
				$('a#btnLoadSysex').attr('disabled',false);
			}
		});

		if($.cookie('portId')){
			$('select#midiOutput').val($.cookie('portId'));
			$('a#btnLoadSysex').attr('disabled',false);
		}
		
		$('.overlay').hide();
		
		$.MIDIMessageEventHandler=function(event){
	    	var msg=event.data[0];
	    	var midichannel=event.data[0] & 0x0f;
	    	var type=msg & 0xf0;
	    	var sdump=event.data;
			console.log('sdump.length='+sdump.length);
	    	var hstr='';
	    	for(var i in sdump){
	    		//console.log(sdump[i]);
	    		var hx=sdump[i].toString(16);
	    		if(hx.length==1)hx='0'+hx;
	    		hstr+=hx.toUpperCase();
	    	}
	    }
    }
    */
});