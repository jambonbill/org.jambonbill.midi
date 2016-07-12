// jambonbill midi.js  - keyboard
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.

var portId='';
var octave=0;
var notes=[];// notes currently on
var notestr=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];

var kmap=[];// Keyboard mapping
// QWERTY //
kmap[90]='0';// Z - Octave 1
kmap[83]=1;// S
kmap[88]=2;// X
kmap[68]=3;// D
kmap[67]=4;// C
kmap[86]=5;// V
kmap[71]=6;// G
kmap[66]=7;// B
kmap[72]=8;// H
kmap[78]=9;// N
kmap[77]=10;// M
kmap[188]=11;// <
kmap[81]=12;// Q - Octave 2
kmap[50]=13;// 2 - Octave 2
kmap[87]=14;// W - Octave 2
kmap[51]=15;// 3 - Octave 2
kmap[69]=16;// E - Octave 2
kmap[82]=17;// R - Octave 2
kmap[53]=18;// 5 - Octave 2
kmap[84]=19;// T - Octave 2
kmap[54]=20;// 6 - Octave 2
kmap[89]=21;// Y - Octave 2
kmap[55]=22;// 7 - Octave 2
kmap[85]=23;// U - Octave 2
kmap[73]=24;// I - Octave 3
kmap[57]=25;// 9 - Octave 3
kmap[79]=26;// O - Octave 3
kmap[48]=27;// 0 - Octave 3
kmap[80]=28;// P - Octave 3


function onMIDIInit(midi) {
	
	//console.log('onMIDIInit(midi)',midi);
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


function setPortId(id){
	
	console.info('setPortId()',id);
    
    //here we should make sure the portId is available
    
    portId=id;
    
    $.cookie('midi_portId', portId);
    
    $('#boxLog .box-body').html("Output : "+portId);
    $('#midiChannel,#octave').attr('disabled',false);
    $("#midi_outputs").val(portId);
}


function onMIDIReject(err) {
	console.error("The MIDI system failed to start.");
	$('#midi_outputs').attr('disabled','disabled')
}


function noteOn(noteNumber,midiChannel){
	
	if(!portId){
		console.warn('!portId');
		return;
	}
	
	if(!noteNumber){
		console.warn('!noteNumber');
		return;	
	}
	
	/*
	if(midiChannel){
		console.warn('!midiChannel');
		return;	
	}
	*/
	
	for(var i=0;i<notes.length;i++){
		if(notes[i]==noteNumber)return;//dont play it twice
	}
	
	//var midiChan=+$('#midiChannel').val();
	
	console.log('noteOn()',noteNumber,midiChannel);
	
	var noteOnMessage = [0x90+midiChannel, noteNumber, 0x7f];    // note on, middle C, full velocity
	var output = midiAccess.outputs.get(portId);
	output.send( noteOnMessage );
	notes.push(noteNumber);
}

function noteOff(noteNumber,midiChannel){
	
	if(!portId||!noteNumber)return;
	
	console.log('noteOff()',noteNumber,midiChannel);
	
	//var midiChan=+$('#midiChannel').val();
	var output = midiAccess.outputs.get(portId);
	// note off
	output.send( [0x80+midiChannel, noteNumber, 0x40]);

	// remove note from the note stack
	var nn=[];
	for(var i=0;i<notes.length;i++){
		if(notes[i]!=noteNumber)nn.push(notes[i]);
	}
	notes=nn;
}


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


/**
 * Kill all notes
 * @return {[type]} [description]
 */
function midiPanic()
{
	console.log('midiPanic()',notes);

}



function keyCodeToMidiNote(keyCode){
	// could be customised //
	var n=kmap[keyCode];
	var nid=n%12;

	if (n) {
		return n;	
	}
	
}


$(function(){

	//var pressedKeys = [];
	 
	$("#midi_outputs").change(function(e){
        setPortId($("#midi_outputs").val());
	});
    
    $("#octave").change(function(e){
        octave=$("#octave").val()*1;
        console.log("octave",octave);
    });

    $('#btnMapping').click(function(){
        displayKeyMap();
    });


    // Keyboard //
	$("body").keydown(function(e) {
		
        if (!portId) {
            $('#boxLog .box-body').html("<i class='fa fa-warning'></i> Select midi output");
            $('#midi_outputs').focus();
            return;
        }
		
        $('#keyname').val('test');
        $('#keycode').val(e.keyCode);
        
        var htm='Key:'+e.keyCode;
		
		
		if (kmap[e.keyCode]) {
			
			var n=keyCodeToMidiNote(e.keyCode);
			var nid=n%12;
			var oct=Math.floor(n/12);

			noteOn(n+(octave*1),+$('#midiChannel').val());

			htm="<i class='fa fa-music'></i> "+notestr[nid]+octave;
            $('#boxLog .box-body').html(htm); 
		
		} else {
			
			console.warn("Key:"+e.keyCode+" not mapped !");
			//htm="<i class='fa fa-warning'></i> Key:"+e.keyCode+" not mapped !";
            
            if (e.keyCode>=112&&e.keyCode<=115) {//F1234-Keys
                console.log("F"+e.keyCode);
                e.stopPropagation();
                e.preventDefault();
                return;
            }
            
            switch(e.keyCode){
                case 27://ESC
                    midiPanic();
                    break;
            }
		}
		
	});

	$("body").keyup(function(e) {
		//console.log( ".keyup()",e.keyCode );
		var midiChannel=+$('#midiChannel').val();
		var n=keyCodeToMidiNote(e.keyCode);
		noteOff(n+(octave*12),midiChannel);
	});
    
    $('#midi_outputs').focus();
	
    // patch up prefixes
    window.AudioContext=window.AudioContext||window.webkitAudioContext;

    context = new AudioContext();

    if (navigator.requestMIDIAccess)
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    else
        console.warn("No MIDI support present in your browser")


});
