// jambonbill midi.js  - keyboard
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.
var portId='';

window.addEventListener('load', function() {
  // patch up prefixes
  window.AudioContext=window.AudioContext||window.webkitAudioContext;

  context = new AudioContext();

  if (navigator.requestMIDIAccess)
    navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
  else
    alert("No MIDI support present in your browser")
} );


function onMIDIInit(midi) {
  
  console.log('onMIDIInit(midi)',midi);
  console.log('MIDI ready!');
  midiAccess = midi;

  var haveAtLeastOneDevice=false;
  /*
  var inputs=midiAccess.inputs.values();
  for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
    console.log("input",input);
    input.value.onmidimessage = MIDIMessageEventHandler;
    haveAtLeastOneDevice = true;
    
    var x = document.getElementById("midi_inputs");
    var option = document.createElement("option");
    option.value = input.value.id;
    option.text = input.value.name;
    x.add(option);
  }
  */
  var outputs=midiAccess.outputs.values();
  for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
    console.log("output",output);

    var x = document.getElementById("midi_outputs");
    var option = document.createElement("option");
    option.value = output.value.id;
    option.text = output.value.name;
    x.add(option);
    haveAtLeastOneDevice = true;
  }  

  if (!haveAtLeastOneDevice){
    document.getElementById("midi_outputs").hide();
    alert("No MIDI input devices present.");
  }
    
}


function onMIDIReject(err) {
  alert("The MIDI system failed to start.");
}


function MIDIMessageEventHandler(event) {
  console.log('MIDIMessageEventHandler(event)',event);
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        noteOn(event.data[1]);
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    case 0x80:
      noteOff(event.data[1]);
      return;
  }
}


/*
function sendMiddleC( mid, portID ) {
  
  console.log('sendMiddleC(mid, portID)',mid, portID);
  
  var noteOnMessage = [0x90, 60, 0x7f];    // note on, middle C, full velocity
  var output = mid.outputs.get(portID);
  
  output.send( noteOnMessage );  //omitting the timestamp means send immediately.
  // note off
  output.send( [0x80, 60, 0x40], window.performance.now() + 1000.0 ); // Inlined array creation- note off, middle C,  
                                                                      // release velocity = 64, timestamp = now + 1000ms.
}
*/

function noteOn(noteNumber){
    
    console.log('noteOn()',note);
    
    var noteOnMessage = [0x90, noteNumber, 0x7f];    // note on, middle C, full velocity
    var output = midiAccess.outputs.get(portId);
}

function noteOff(noteNumber){
    
    console.log('noteOff()',note);
    
    var output = midiAccess.outputs.get(portId);
    // note off
    output.send( [0x80, noteNumber, 0x40]);
}


$(function(){
  
  var pressedKeys = [];
	 
  
  $("#midi_outputs").change(function(e){
    portId=$("#midi_outputs").val();
    console.log("portId",portId);
  });
  
  
  $("body").keydown(function(e) {
    console.log( ".keydown()",e.keyCode );
  });

  $("body").keyup(function(e) {
    console.log( ".keyup()",e.keyCode );
  });

  console.log('keyboard.js');
});
