var SID;

$(function(){
	

	var context=null;   // the Web Audio "context" object
	var _midiAccess=null;  // the MIDIAccess object.
	var _portId;
	var _inputs;
	var _outputs;
	// patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();

    if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess({sysex:true}).then( onMIDIInit, onMIDIReject );
    else
        console.warn("No MIDI support present in your browser");


	function onMIDIInit(midi) {
		
		//console.log('onMIDIInit(midi)',midi);
		_midiAccess = midi;


		var inputs=_midiAccess.inputs.values();
	  	
	  	for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
	    	input.value.onmidimessage = MIDIMessageEventHandler;
	    	//_inputs.push(input.value);
	  	}

		var outputs=_midiAccess.outputs.values();
		
		_outputs=[];
		for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
			_outputs.push(output.value);
		}  
		
		for(var i in _outputs){
			var x = document.getElementById("midi_outputs");
			var option = document.createElement("option");
			option.value = _outputs[i].id;
			option.text = _outputs[i].name;
			x.add(option);
		}
		

		if (_outputs.length==0) {
			console.error("No MIDI output devices present");
			//$('#midi_outputs').attr('disabled','disabled');
	        return;
		}else{
			console.info(_outputs.length+" midi output(s) detected",_outputs);
		}
		
	    
	    if ($.cookie('midi_portId')) {
	        _portId=$.cookie('midi_portId'); 
	        $.midiPortId(_portId);
	    }else{
	        $('#boxLog .box-body').html('Midi ready. Select midi output');    
	        //$('#midi_outputs').focus();
	    }
	}


	function MIDIMessageEventHandler(event) {
  
    	//var msg=event.data[0] & 0xf0;
    	var msg=event.data[0];
    	var midichannel=event.data[0] & 0x0f;
    	var type=msg & 0xf0;
    	
    	var sdump=event.data;
		
		console.log('sdump.length='+sdump.length);
    	
    	if (sdump.length==1036) {
    		
    		SID.load(sdump);
    		return;
    	}

    	var hstr='';
    	for(var i in sdump){
    		//console.log(sdump[i]);
    		var hx=sdump[i].toString(16);
    		if(hx.length==1)hx='0'+hx;
    		hstr+=hx+' ';
    	}
    	console.clear();
    	console.info("incoming sysex:",hstr);
		//$('#inputSyx').val(hstr);
    	//parse event, and make notifications
    	/*
    	var notification = new Notification('Notification title', {
	      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
	      body: "Hey there! You've been notified!",
	    });
		*/
    }

    function readSyx(sdump)
    {
    	// f0 00 00 7e 4b 00 0f f7
    	if(sdump[0]!=0xf0)return;
    	if(sdump[1]!=0x00)return;
    	if(sdump[2]!=0x00)return;
    	if(sdump[3]!=0x7e)return;
    	if(sdump[4]!=0x4b)return;
    	if(sdump[5]!=0x00)return;
    	if(sdump[6]!=0x0f)return;
    	if(sdump[7]!=0xf7)return;
    	return true;
    }


    $.midiAccess=function(){
    	return _midiAccess;
    }

	$.midiInputs=function(){
		return _inputs;
	}

	$.midiOutputs=function(){
		return _outputs;
	}

	$.midiOutput=function(){
		if (!_portId) {
			console.warn('!_portId');
			return;
		}
		return _midiAccess.outputs.get(_portId);
	}


	function onMIDIReject(err) {
		console.error("The MIDI system failed to start.");
		$('#midi_outputs').attr('disabled','disabled')
	}


	$.midiPortId=function(id){
		
		console.info('$.midiPortId()',id);
	    
	    //here we should make sure the portId is available
	    
	    if (id) {
	    	_portId=id;
	    }
	    
	    $.cookie('midi_portId', _portId);
	    return _portId;
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
			
			SID.decode64(json.bin);

		}).error(function(e){
			console.error(e.responseText);
		});
	}
	
	$('#btnOpen').click(function(){
		$('#myModal').modal('show');
		patchSelector(function(e){
			$('#myModal').modal('hide');
			var filename=e.currentTarget.title;
			console.log(filename);
			preview(filename);
		});
	});
	
	$('#midi_outputs').change(function(){
		$.midiPortId($('#midi_outputs').val());
	});

	$('#btnPing').click(function(){//F0 00 00 7E 4B <device number> 0F F7
		
		console.log('click ping');
		
		if (!_portId) {
			console.warn('!portid');
			return;
		}
		
		var device_number=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x0F,0xF7] );
	});

	

	$('#btnPlay').click(function(){//F0 00 00 7E 4B <device-number> 0C 09 [<ins>] F7
		console.log('click btnPlay');
		if(!_portId){
			console.warn('!portid');
			return;
		}
		var device_number=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x0C,0x09,0xF7] );
	});

	$('#btnStop').click(function(){//0C/b) F0 00 00 7E 4B <device-number> 0C 08 F7
		console.log('click btnStop');
		if(!_portId){
			console.warn('!portid');
			return;
		}
		var device_number=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x0C,0x08,0xF7] );
	});

	// 01/a) 
	// Request a dump of <patch> in <bank>
	// F0 00 00 7E 4B <device-number> 01 00 <bank> <patch> F7
	$('#btnReq1').click(function(){
		
		console.log('btnReq1');
		
		if(!_portId){
			console.warn('!portid');
			return;
		}
		
		var device_number=0x00;
		var patch=0x00;
		var bank=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x01,0x00,bank,patch,0xF7] );
	});

	

	// 01/b)
    // Request the current patch edit buffer (direct read from RAM)
	// F0 00 00 7E 4B <device-number> 01 08 00 00 F7
	$('#btnReq2').click(function(){
		
		console.log('btnReq2');
		
		if(!_portId){
			console.warn('!portid');
			return;
		}
		
		var device_number=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x01,0x08,0x00,0x00,0xF7] );

	});
	
	SID=SidV2();
});