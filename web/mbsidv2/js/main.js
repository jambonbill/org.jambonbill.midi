var SID;//global scope for console debug
$(function(){
	
	$.MIDIMessageEventHandler=function(event){

    	//var msg=event.data[0] & 0xf0;
    	var msg=event.data[0];
    	var midichannel=event.data[0] & 0x0f;
    	var type=msg & 0xf0;

    	var sdump=event.data;

		console.log('sdump.length='+sdump.length);

    	if (sdump.length==1036) {
    		notification("Sysex dump received","now calm down");
    		console.log(sdump);
    		SID.load(sdump);
    		var data=SID.decode();
    		console.log(data);
    		var blob = new Blob([sdump], {type: "application/octet-stream"});
        	//saveAs(blob, "patch__.syx");
        	//var objectUrl = URL.createObjectURL(blob);
        	//window.open(objectUrl);
    		
    		return;
    	}

    	var hstr='';
    	for(var i in sdump){
    		//console.log(sdump[i]);
    		var hx=sdump[i].toString(16);
    		if(hx.length==1)hx='0'+hx;
    		hstr+=hx.toUpperCase();
    	}

		// Errors: F0 00 00 7E 4B <device> 0E <error-code> F7 //

    	switch(hstr){

    		case 'F000007E4B000FF7':
    			notification("Ping received!","now we're talking");
    			break;

    		default:
    			console.warn('unknow sdump',hstr);
    			notification("Incoming sysex",hstr);
    			break;

    	}

    	//console.clear();
    	//console.info("incoming sysex:",hstr.toUpperCase());
		//$('#inputSyx').val(hstr);
    	//parse event, and make notifications
    	//notification("Incoming sysex",hstr.toUpperCase());
    }
    

    function init(){
    	console.log('init()');
		var ins=$.midiInputs();
		for(var i in ins){
			var o=ins[i];
			var x = document.getElementById("midiInput");
			var opt = document.createElement("option");
		    opt.value = o.id;
		    opt.text = o.name;
		    x.add(opt);
		}
    	
    	var ops=$.midiOutputs();
		for(var i in ops){
			var o=ops[i];
			var x = document.getElementById("midiOutput");
		    var opt = document.createElement("option");
		    opt.value = o.id;
		    opt.text = o.name;
		    x.add(opt);
		}

		$('select#midiInput, select#midiOutput').attr('disabled',false);
		$('select#midiInput, select#midiOutput').attr('readonly',false);
		
		$('select#midiInput').change(function(e){
			console.log(e.currentTarget.value);
			$.cookie('inputId',e.currentTarget.value);
			if(e.currentTarget.value){
				//$('a#btnLoadSysex').attr('disabled',false);
			}
		});

		$('select#midiOutput').change(function(e){
			console.log(e.currentTarget.value);
			$.cookie('outputId',e.currentTarget.value);
			if(e.currentTarget.value){
				//$('a#btnLoadSysex').attr('disabled',false);
			}
		});

		if($.cookie('inputId')){
			$('select#midiInput').val($.cookie('inputId'));
		}
		if($.cookie('outputId')){
			$('select#midiOutput').val($.cookie('outputId'));
		}
    }

    setTimeout(init,500);

    function readSyxHeader(sdump)
    {
    	// Header: f0 00 00 7e 4b 00 0f f7
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

   

	var engines=['Lead','Bassline','Drum','Multi'];
	var _files;

	function getPatches()
	{
		console.info('getPatches() (list from server)');
		$("#boxPatches .overlay").show();
		$.post('ctrl.php',{'do':'browse'},function(json){
			$("#boxPatches .overlay").hide();
			//console.log(json);
			_files=json.files;
			displayPatches();
		}).error(function(e){
			console.error(e.responseText);
		});
	}

	getPatches();

	function displayPatches(){

		//console.info('displayPatches()',_files);

		var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';

		htm+='<thead>';
		htm+='<th>Filename</th>';
		htm+='<th>Name</th>';
		htm+='<th width=80>Engine</th>';
		htm+='<th width=20 title="Patch number">Patch</th>';
		htm+='<th width=20>Bnk</th>';
		htm+='<th width=20 title="checksum">CS</th>';
		htm+='<thead>';
		htm+='</thead>';
		htm+='<tbody>';

		for (var i in _files) {
			var o=_files[i];
			htm+='<tr title="'+o.basename+'" data-filename="'+o.basename+'">';
			htm+='<td>'+o.basename;
			htm+='<td>'+o.patch.name;
			htm+='<td>'+engines[o.patch.engine];
			htm+='<td style="text-align:center">'+o.patch.patch;
			htm+='<td style="text-align:center">'+o.patch.bank;
			htm+='<td style="text-align:right">'+o.patch.checksum.toUpperCase();
		}

		htm+='</tbody>';
		htm+='</table>';
		htm+='<i class="text-muted">'+_files.length+' patches</i>';

		$("#boxPatches .box-title").html(_files.length+" patche(s)");
		$("#boxPatches .box-body").html(htm);
		$("table").tablesorter();

		$("#boxPatches tbody>tr").click(function(e){
			var filename=e.currentTarget.dataset.filename;	
			if(!filename)return;
			preview(filename);
		});
	}


	function preview(filename){
		console.info('preview()',filename);
	
		$("#myModal").modal('show');
		
		$("#boxPatches .overlay").show();
		$.post('ctrl.php',{'do':'preview','file':filename},function(json){
			$("#boxPatches .overlay").hide();
			console.log(json);
			SID.decode64(json.bin);
			var data=SID.decode();
			console.info("patch data",data);
			$('#modalPatch').modal('show');
			$('#modalPatch .modal-title').html(data.patchName);
			/*
			bank:1
			device-number:0
			engine:1
			//extSwitch:0
			osc_detune:4
			osc_phase_offset:0
			patch:8
			patchName:"Bassline 7      "
			volume:127
			*/

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

	


	$('#btnPing').click(function(){//F0 00 00 7E 4B <device number> 0F F7
		
		var _portId=$('#midiOutput').val();
		if (!_portId) {
			console.warn('!portid');
			return;
		}

		console.log('click ping');
		var device_number=0x00;
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B, device_number, 0x0F,0xF7]);
	});


	/*
	F0 00 00 7E 4B <device-number> 0C 09 [<ins>] F7
    Plays the current patch (C-3 with max velocity is played, can be used
    to test the patch independent of the MIDI channel)
	*/
	$('#btnPlay').click(function(){//F0 00 00 7E 4B <device-number> 0C 09 [<ins>] F7
		var _portId=$('#midiOutput').val();
		if(!_portId){
			console.warn('!portid');
			return;
		}
		console.log('click btnPlay');

		var device_number=0x00;
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x0C,0x09,0x00,0xF7] );
	});


	$('#btnStop').click(function(){//0C/b) F0 00 00 7E 4B <device-number> 0C 08 F7
		var _portId=$('#midiOutput').val();
		if(!_portId){
			console.warn('!portid');
			return;
		}
		allNotesOff();
	});


	function allNotesOff(){
		// 0C/b) F0 00 00 7E 4B <device-number> 0C 08 F7
		console.log('allNotesOff()');
		var device_number=0x00;
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x0C,0x08,0xF7]);
	}

	// 01/a)
	// Request a dump of <patch> in <bank>
	// F0 00 00 7E 4B <device-number> 01 00 <bank> <patch> F7
	$('#btnReq1').click(function(){

		var _portId=$('#midiOutput').val();
		if(!_portId){
			console.warn('!portid');
			return;
		}

		console.log('Sending patch request');

		var device_number=0x00;
		var patch=0x00;
		var bank=0x00;
		patch=prompt("Enter pacth number",patch);
		bank=prompt("Enter bank number",bank);
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x01,0x00,+bank,+patch,0xF7]);
	});



	// 01/b)
    // Request the current patch edit buffer (direct read from RAM)
	// F0 00 00 7E 4B <device-number> 01 08 00 00 F7
	$('#btnReq2').click(function(){
		
		var _portId=$('#midiOutput').val();
		if(!_portId){
			console.warn('!portid');
			return;
		}

		console.log('Request the current patch edit buffer (direct read from RAM)');

		var device_number=0x00;
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x01,0x08,0x00,0x00,0xF7] );

	});

	
	/*
	  03/a) F0 00 00 7E 4B <device-number> 03 00 <bank> F7
        Request a dump of the whole patch <bank> (128 patches)
        Only 64 patches are sent when a 32k BankStick is accessed
	*/
	$('#btnReq3').click(function(){
		var _portId=$('#midiOutput').val();
		var device_number=0x00;
		var bank=0x00;
		bank=prompt("Get bank number",bank)
		
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x03,0x00,+bank,0xF7] );
	});

	$('#btnDirectWrite').click(function(){
		console.log('#btnDirectWrite');
		directWrite(0x00, 0x21);
		directWrite(0x01, 0x21);
		directWrite(0x02, 0x21);
		directWrite(0x03, 0x21);
	});

	function directWrite(address, value){// 06/a

		// Direct Write of parameter into patch buffer

		console.info('directWrite(address, value)',address, value);

		/*
		  06/a) F0 00 00 7E 4B <device-number> 06 <WOPT> <AH> <AL> <value_l> <value_h> F7
        Direct Write of parameter into patch buffer (<AH> = 0..3, <AL> = 0..7F)
        Patch address: (<AH> << 7) | <AL>
        <WOPT>: options to speed up communication with editor, behaviour depends on engine
        */

       	var device_number=0x00;

		var WOPT=0x00;// Direct Write Options
		var AH=0x00;//<AH> = 0..3,
		var AL=address & 0x7F;	//<AL> = 0..7F)
		var value_h=value >> 7;
		var value_l=value & 0x7F;

		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B,device_number,0x06,WOPT, AH, AL, value_l, value_h, 0xF7] );

	}

	// Lets try to send a patch !
	//function sendSyx(){}

	SID=SidV2();
});