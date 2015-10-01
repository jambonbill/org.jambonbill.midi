// jambonbill midi.js 
var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.
var logs=[];

window.addEventListener('load', function() {
  // patch up prefixes
  window.AudioContext=window.AudioContext||window.webkitAudioContext;

  context = new AudioContext();

  if (navigator.requestMIDIAccess)
    navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
  else
    console.log("No MIDI support present in your browser")

} );


function onMIDIInit(midi) {
  
  console.log('onMIDIInit(midi)',midi);
  console.log('MIDI ready!');
  midiAccess = midi;

  var haveAtLeastOneDevice=false;
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
  /*
  var outputs=midiAccess.outputs.values();
  for ( var output = outputs.next(); output && !output.done; output = outputs.next()) {
    console.log("output",output);

    var x = document.getElementById("midi_outputs");
    var option = document.createElement("option");
    option.value = output.value.id;
    option.text = output.value.name;
    x.add(option);
  }  
  */
  
  if (!haveAtLeastOneDevice)
    console.log("No MIDI input devices present.");
}

function onMIDIReject(err) {
  console.log("The MIDI system failed to start.");
}


function dispLog()
{
    if(logs.length>30)logs.shift();
    var htm='<table class="table table-condensed table-hover">';
    htm+='<thead>';
    htm+='<th>Time</th>';
    htm+='<th>Msg</th>';
    htm+='<th width=50>Chn</th>';
    htm+='<th width=50>B1</th>';
    htm+='<th width=50>B2</th>';
    htm+='</thead>';
    htm+='<tbody>';
    for(var i=0;i<logs.length;i++){
      var d=logs[i].t;
      htm+='<tr>';
      htm+='<td>'+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"-"+d.getMilliseconds();
      htm+='<td>'+logs[i].msg;
      htm+='<td>'+(logs[i].chn+1);
      htm+='<td>';
      if(logs[i].b1)htm+=logs[i].b1;
      htm+='<td>';
      if(logs[i].b2)htm+=logs[i].b2;
      //htm+='<td>';
    }
    htm+='</tbody>';
    htm+='</table>';
    $('#boxIncoming .box-body').html(htm);
}


function clearLogs(){
  console.log('clearLogs()');
  logs=[];
  dispLog();
}

/*
http://www.gweep.net/~prefect/eng/reference/protocol/midispec.html
Messages :
8 = Note Off 
9 = Note On 
A = AfterTouch (ie, key pressure) 
B = Control Change 
C = Program (patch) change 
D = Channel Pressure 
E = Pitch Wheel
 */
function MIDIMessageEventHandler(event) {
  
  var msg=event.data[0] & 0xf0;
  //if(msg==240)return; 
  var midichannel=event.data[0] & 0x0f;
  logs.push({'t':new Date(),'msg':msg,'chn':midichannel,'b1':event.data[1],'b2':event.data[2]});
  dispLog();
  
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    
    case 0x90://note on
      
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        var note=event.data[1];
        var velo=event.data[2];
        console.log('note-on',event.data[0] & 0x0f,note,velo);
        
        // if velocity == 0, fall thru: it's a note-off
        return;

      }
      
    case 0x80://note off
      //noteOff(event.data[1]);
      console.log('note-off',event.data[0] & 0x0f,event.data[1],event.data[2]);
      return;
    
    case 0xb0://modulation
      console.log("modulation");
      break;

    case 0xe0://pitch
      console.log("pitch");
      break;

    case 0xf0://continue
      console.log("0xf0");
      break;

    default:
      hexString = (event.data[0] & 0xf0).toString(16);
      console.log(hexString);
      //console.log('MIDIMessageEventHandler(event)',event);    
      break;
  }
  
}

$(function(){
	console.log('monitor.js');
  
    $('#btnClear').click(function(){
        console.log('btnClear');
        clearLogs();
    });

    $('#btnFilter').click(function(){
        console.log('btnFilter');
    });

    $('#btnRecord').click(function(){
        console.log('btnRecord');

    });
});
