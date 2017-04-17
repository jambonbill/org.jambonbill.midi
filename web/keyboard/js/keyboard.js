// jambonbill midi.js  - keyboard
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

$(function(){
	
	//var context=null;   // the Web Audio "context" object
	//var midiAccess=null;  // the MIDIAccess object.
	var _midiChannel=0;
	var _portId='';
	
	var _octave=3;
	var _prg=0;//current prg
	var _notes=[];// note buffer (being played)
	var _notestr=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
	

	function displayKeyMap()
	{
	    console.log('displayKeyMap()');
	    var htm=[];
	    htm.push('<table class="table table-condensed">');
	    htm.push('<thead>');
	    htm.push('<th>Key</th>');
	    htm.push('<th>Note</th>');
	    htm.push('<th>Value</th>');
	    htm.push('</thead>');
	    htm.push('<tbody>');
	    for (var i=0;i<kmap.length;i++) {
	        if(!kmap[i])continue;
	        var n=keyCodeToMidiNote(i);
	        htm.push("<tr>")
	        htm.push("<td>"+i);
	        htm.push("<td>"+notestr[n]);
	        htm.push("<td>"+n);
	    }
	    htm.push('</tbody>');
	    htm.push('</table>');
	    $('#boxLog .box-body').html(htm.join(''));
	}


	function setPortId(id){
		
		console.info('setPortId()',id);	    
		_portId=id;
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

	function midiNoteToString(n){
	    var note=n%12;
	    var notes=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
	    var oct=Math.floor(n/12);
	    return notes[note]+oct;
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
		
		console.log('noteOn() '+midiNoteToString(noteNumber), noteNumber, _midiChannel);
		
		var noteOnMessage = [0x90+midiChannel, noteNumber, 0x7f];    // note on, middle C, full velocity
		var output = midiAccess.outputs.get(_portId);
		output.send( noteOnMessage );
		_notes.push(noteNumber);
	}

	
	function noteOff(noteNumber,midiChannel)
	{
		
		if(!_portId){
			console.warn('!_portId');
			return;
		}
		
		if(!_portId||!noteNumber){
			console.warn(!_portId||!noteNumber);
			return;
		}
		
		//console.log('noteOff()',noteNumber,midiChannel);
		
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

	$("#octave").change(function(e){
		setOctave(+$("#octave").val());
    });


    $('#btnMapping').click(function(){
        displayKeyMap();
    });


    


	
    
    function selectMidiChannel(n){
    	_midiChannel=+n;
    	console.info('selectMidiChannel(n)',n);
    	
    }

	
	
    
    function init(){
		
		// Keyboard //
		$("body").keydown(function(e) {
			
	        if (!_portId) {
	            $('#boxLog .box-body').html("<i class='fa fa-warning'></i> Select midi output");
	            $('#midi_outputs').focus();
	            return;
	        }
			
	        $('#keyname').val('test');
	        $('#keycode').val(e.keyCode);
	        
	        var htm='Key:'+e.keyCode;
			
			
			if (kmap[e.keyCode]) {
				
				var n=keyCodeToMidiNote(e.keyCode);
				//console.log("n="+n);
				var nid=n%12;
				var oct=Math.floor(n/12);
				var midinote=n+(+_octave*12);
				noteOn(midinote,_midiChannel);

				htm=midiNoteToString(midinote) + " midinote("+midinote+") on channel "+_midiChannel;
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
		
		$("body").keyup(function(e) {
			var n=keyCodeToMidiNote(e.keyCode);
			noteOff(n+(_octave*12),_midiChannel);
		});
    

		// Midi channel selector //
	    $('ul>li').click(function(e){
	    	$('ul>li').removeClass("active");
	    	$(this).addClass("active");
	    	selectMidiChannel(e.currentTarget.dataset.channel);
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
    	
    	console.info('init()');

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
		$('select#octave').attr('disabled',false);
		$('select#prgs').attr('disabled',false);
		$('select#midiOutput').change(function(e){
			console.log(e.currentTarget.value);
			setPortId(e.currentTarget.value);
		});
    }
	
	setTimeout(init,500);
    //init();
});
