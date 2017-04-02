//var context;
//var midiAccess=null;  // the MIDIAccess object.

$(function(){
	/*
	var midi_inputs=[];
	var midi_outputs=[];	

	// patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();

    if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess({sysex:true}).then( onMIDIInit, onMIDIReject );
    else
        console.warn("No MIDI support present in your browser")

	console.log('sysex.js');

	
	function onMIDIInit(midi) {
		
		
		midiAccess = midi;

		var outputs=midiAccess.outputs.values();
		
		var options=[];
		for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
			options.push(output.value);
		}  

		for(var i in options){
			var x = document.getElementById("midi_outputs");
			var option = document.createElement("option");
			option.value = options[i].id;
			option.text = options[i].name;
			x.add(option);
		}

		if (options.length==0) {
			console.error("No MIDI output devices present");
			$('#midi_outputs').attr('disabled','disabled');
	        return;
		}else{
			$('#midi_outputs').attr('disabled',false);
			$('#midi_outputs').attr('size',options.length);
		}
		
	    
	    if ($.cookie('midi_portId')) {
	        portId=$.cookie('midi_portId'); 
	        setPortId(portId);
	    }else{
	        $('#boxLog .box-body').html('Midi ready. Select midi output');    
	    }

	}


	function onMIDIReject(err) {
		console.error("The MIDI system failed to start.");
		$('#midi_outputs').attr('disabled','disabled')
	}


	function setPortId(id){
		
		console.info('setPortId()',id);
	    
	    //here we should make sure the portId is available
	    
	    portId=id;
	    
	    $.cookie('midi_portId', portId);
	    
	    $('#boxLog .box-body').html("Output : "+portId);
	    $('#midiChannel,#octave').attr('disabled',false);
	    $("#midi_outputs").val(portId);
	}
	*/
	$('#btnLoadSysex').click(function(){
		console.log('#btnLoadSysex');
		$('#modalSysex').modal('show');
	});
	
	$('#btnSendSysex').click(function(){
		console.log('#btnSendSysex');
	});


	$('#loadFromFile').change(function(evt) {
			evt.stopPropagation();
			evt.preventDefault();
			var file = evt.target.files[0];
			var reader = new FileReader();
			var data = false;
			reader.onload = (function(theFile) {
				return function(e) {
					//data = JSON.parse(e.target.result);
					data = e.target.result;
					console.log(data.length+"bytes");
					/*
					function toHex(byte) {
					  return ('0' + (byte & 0xFF).toString(16)).slice(-2);
					}
					
					for(var i in data){
						var b=data[i];
						//console.log(toHex(b));
					}
					*/
				}
			})(file);
			//reader.readAsText(file);
			reader.readAsDataURL(file);
		});

	$('#btnSaveSysex').click(function(){
		var content=$('#sysex_in').val();
		if(!content){
			return;
		}
		var uriContent = "data:application/octet-stream," + encodeURIComponent(content);	
		newWindow = window.open(uriContent, 'new');
	});

});

