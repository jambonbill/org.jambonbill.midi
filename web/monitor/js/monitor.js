// jambonbill midi.js 
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript

var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.
var midiInputs=[];
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
  
  //console.log('onMIDIInit(midi)',midi);
  console.log('MIDI ready!');
  midiAccess = midi;

  var inputs=midiAccess.inputs.values();
  midiInputs=[];
  for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
    //console.log("input",input);
    input.value.onmidimessage = MIDIMessageEventHandler;
    midiInputs.push(input.value);
  }
  
  //console.log(midiInputs);
  
  for(var i in midiInputs){
    var x = document.getElementById("midi_inputs");
    var option = document.createElement("option");
    option.value = midiInputs[i].id;
    option.text = midiInputs[i].name;
    x.add(option);
  }

  $('#midi_inputs').attr('size',midiInputs.length);

  
  if (midiInputs.length==0)
    console.error("No MIDI input devices present.");
}

function onMIDIReject(err) {
  console.error("The MIDI system failed to start.");
}

function msgType(msg){
  
  var msg=msg & 0xf0;
  
  var msgtypes={
    0x10:'0x10 ?',
    0x20:'0x20 ?',
    0x30:'0x30 ?',
    0x40:'0x40 ?',
    0x80:'Note off',
    0x90:'Note on',
    0xa0:'AfterTouch',
    0xb0:'Control change',
    0xc0:'Program change',
    0xe0:'Pich wheel',
    0xf0:'Continue'
  }  
  switch(msg){
    case 0x90:
        return   msgtypes[msg] + " <i class='text-muted'>C-0</i>";
    case 0xb0:
        return   msgtypes[msg] + " <i class='text-muted'>#0</i>";
  }
  return msgtypes[msg];
}


function dispLog()
{
    if(logs.length>20)logs.shift();
    
    var htm='<table class="table table-hover table-condensed">';
    
    htm+='<thead>';
    htm+='<th width=100>Time</th>';
    htm+='<th>Type</th>';
    htm+='<th width=50>Msg</th>';
    htm+='<th width=50>Chn</th>';
    htm+='<th width=50>B1</th>';
    htm+='<th width=50>B2</th>';
    htm+='</thead>';
    
    htm+='<tbody>';
    for(var i=0;i<logs.length;i++){
      var d=logs[i].t;
      var msg=logs[i].e.data[0];
      var midichannel=msg & 0x0f;
      htm+='<tr>';
      htm+='<td>'+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"-"+d.getMilliseconds();
      
      //var msgtype=table-condensed

      htm+='<td>'+msgType(msg);
      htm+='<td>0x'+msg.toString(16);
      
      htm+='<td>'+(midichannel+1);
      htm+='<td>';
      if(logs[i].e.data[1])htm+=logs[i].e.data[1];
      
      htm+='<td>';
      if(logs[i].e.data[2])htm+=logs[i].e.data[2];
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
var continues=0;//bpm counter
function MIDIMessageEventHandler(event) {
  
    //var msg=event.data[0] & 0xf0;
    var msg=event.data[0];
    var midichannel=event.data[0] & 0x0f;
    var type=msg & 0xf0;
    
    if(type==0xf0){
        continues++;
    }

    // Filter here
    for(i in filters){
        if(type==filters[i])return;
    }

    
    //logs.push({'t':new Date(),'msg':msg,'chn':midichannel,'b1':event.data[1],'b2':event.data[2]});
    logs.push({'t':new Date(),'msg':msg,'e':event});

    dispLog();

  // Mask off the lower nibble (MIDI channel, which we don't care about)
  /*
  switch (event.data[0] & 0xf0) {
    
    case 0x90://note on
      
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        var note=event.data[1];
        var velo=event.data[2];
        //console.log('note-on',event.data[0] & 0x0f,note,velo);
        
        // if velocity == 0, fall thru: it's a note-off
      }
      break;

    case 0x80://note off
      //noteOff(event.data[1]);
      console.log('note-off',event.data[0] & 0x0f,event.data[1],event.data[2]);
      break;
    
    case 0xb0://modulation
      //console.log("modulation");
      break;

    case 0xe0://pitch
      //console.log("pitch");
      break;

    case 0xf0://continue
      //console.log("0xf0");
      break;

    default:
      hexString = (event.data[0] & 0xf0).toString(16);
      console.log(hexString);
      //console.log('MIDIMessageEventHandler(event)',event);    
      break;
  }
  */
}


var filters=[];

$(function(){
  
    $('#btnClearLogs').click(function(){
        //console.log('btnClear');
        clearLogs();
    });

    $('input.filters').click(function(){
        //console.log('btnFilter');
        filters=[];
        $('input.filters').each(function(i,e){
          if(e.checked)filters.push(+e.value);
          //console.log(i,e.value,e.checked);
        });
        console.log(filters);
    });

    $('#btnRecord').click(function(){
        console.log('btnRecord');

    });

    // SHIT Midi BPM Counter
    /*
    setInterval(function(){
        console.info("BPM",continues);
        //continues=0;
    }, 1000);
    */
});
