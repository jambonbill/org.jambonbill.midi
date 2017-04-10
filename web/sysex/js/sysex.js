$(function(){

	var _sysex=[];

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

	/*
	$('#btnPing').click(function(){//F0 00 00 7E 4B <device number> 0F F7

		if (!_portId) {
			console.warn('!portid');
			return;
		}
		console.log('click ping');
		var device_number=0x00;
		var output = midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B, device_number, 0x0F,0xF7]);
	});
	*/

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



	function init(){

		console.info('init()');

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
			if(e.currentTarget.value){
				$('a#btnLoadSysex').attr('disabled',false);
			}
		});
    }

	setTimeout(init,500);

});

