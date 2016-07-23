var SID;

$(function(){
	
	var context=null;   // the Web Audio "context" object
	var midiAccess=null;  // the MIDIAccess object.
	var _portId;
	
	// patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();

    if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    else
        console.warn("No MIDI support present in your browser");


	function onMIDIInit(midi) {
		
		//console.log('onMIDIInit(midi)',midi);
		midiAccess = midi;

		var outputs=midiAccess.outputs.values();
		
		var options=[];
		for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
			options.push(output.value);
		}  
		/*
		for(var i in options){
			var x = document.getElementById("midi_outputs");
			var option = document.createElement("option");
			option.value = options[i].id;
			option.text = options[i].name;
			x.add(option);
		}
		*/
		if (options.length==0) {
			console.error("No MIDI output devices present");
			//$('#midi_outputs').attr('disabled','disabled');
	        return;
		}else{
			console.info(options.length+" midi output(s) detected",options);
		}
		
	    
	    if ($.cookie('midi_portId')) {
	        _portId=$.cookie('midi_portId'); 
	        setPortId(_portId);
	    }else{
	        $('#boxLog .box-body').html('Midi ready. Select midi output');    
	        //$('#midi_outputs').focus();
	    }

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



	var _files;
	$.post('ctrl.php',{'do':'browse'},function(json){
		console.log(json);
		_files=json.files;
		//listFiles();
	}).error(function(e){
		console.error(e.responseText);
	});

	var engines=['Lead','Bassline','Drum','Multi'];
	

	//patch selector
	function patchSelector(callBack){
		
		console.info('patchSelector()');
		
		var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';
		htm+='<thead>';
		htm+='<th>Filename</th>';
		htm+='<th>Name</th>';
		htm+='<th>Engine</th>';
		htm+='<thead>';
		htm+='</thead>';
		htm+='<tbody>';
		
		for(var i in _files){
			var o=_files[i];
			htm+='<tr title="'+o.basename+'">';
			htm+='<td>'+o.basename;
			htm+='<td>'+o.patch.name;
			htm+='<td>'+engines[o.patch.engine];
		}
		
		htm+='</tbody>';
		htm+='</table>';
		
		$("#myModal .modal-title").html(_files.length+" file(s)");
		$("#myModal .modal-body").html(htm);
		$("#myModal table").tablesorter();
		$("#myModal tbody>tr").click(function(e){
			callBack(e);
			//console.log(e.currentTarget.title);
			//preview(e.currentTarget.title);
		});
	}


	function preview(filename){
		
		console.info('preview()',filename);
		if(!filename)return;

		$.post('ctrl.php',{'do':'preview','file':filename},function(json){
			
			console.log(json);
			
			SID=SidV2(json.bin);
			SID.decode();

		}).error(function(e){
			console.error(e.responseText);
		});
	}
	
	$('#btnOpen').click(function(){
		$('#myModal').modal('show');
		patchSelector(function(e){
			$('#myModal').modal('hide');
			console.log(e);
		});
	});
	
	$('#btnPing').click(function(){//F0 00 00 7E 4B <device number> 0F F7
		console.log('click ping');
		if(!_portId){
			console.warn('!portid');
			return;
		}
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,0x00,0x0F,0xF7] );
	});

});