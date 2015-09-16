// jambonbill midi.js  - keyboard
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.


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

  if (!haveAtLeastOneDevice)
    alert("No MIDI input devices present.");
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
$(function(){
	
  $("body").keypress(function(e) {
    console.log( "Handler for .keypress() called." ,e);
  });

  console.log('keyboard.js');
});
