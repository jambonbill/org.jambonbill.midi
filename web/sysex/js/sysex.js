//var context;
//var midiAccess=null;  // the MIDIAccess object.

$(function(){

	$('#btnLoadSysex').click(function(){
		console.log('#btnLoadSysex');
		$('#modalSysex').modal('show');
	});

	$('#btnSendSysex').click(function(){
		console.log('#btnSendSysex');

		var device_number=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B, device_number, 0x0F,0xF7]);

	});

	$('#btnPing').click(function(){//F0 00 00 7E 4B <device number> 0F F7

		if (!_portId) {
			console.warn('!portid');
			return;
		}

		console.log('click ping');
		var device_number=0x00;
		var output = _midiAccess.outputs.get(_portId);
		output.send( [0xF0,0x00,0x00,0x7E,0x4B, device_number, 0x0F,0xF7]);
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
					console.log(chars.length+" bytes");
					var str='';
					for(var i=0;i<chars.length;i++){
						var s="0"+chars[i].toString(16).toUpperCase();
						str+=s.substr(0,2)+" ";//dat.push(s);
					}
					console.info("Sysex as HEX",str);
					$('textarea#midi_send').val(str);

					//data = JSON.parse(e.target.result);
					//data = e.target.result;
					//console.log(data);
					//console.log(data.length+"bytes");
					//console.log('data[0]',"0x",data[0]) ;
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
			//reader.readAsDataURL(file);
			//reader.readAsBinaryString(file);
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

});

