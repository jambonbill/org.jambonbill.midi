$(function(){

    'use strict';


    let _midiAccess=null;  // the MIDIAccess object.
    let _midiChannel=0;
    let _midiInputs;
    let _midiOutputs;
    let _midiReady=false;

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    }else{
        console.warn("No MIDI support present in your browser");
    }

    function onMIDIInit(midi) {
        //console.log('onMIDIInit(midi)',midi);
        _midiAccess = midi;

        let inputs=_midiAccess.inputs.values();
        let outputs=_midiAccess.outputs.values();
        
        _midiInputs=[];
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            _midiInputs.push(input.value);
        }
        
        _midiOutputs=[];
        for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
            _midiOutputs.push(output.value);
        }
    
        console.info('MIDI ready');
        _midiReady=true;
        init();
    
    }
       
    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
    }

    function init(){
        
        console.log('init()',_midiInputs);

        for(let i in _midiInputs){
            let o=_midiInputs[i];
            $('select#midiInputs').append($('<option>', {value:o.id,text:o.name}));
        }
        if(_midiInputs.length>4){
            $('select#midiInputs').attr('size', _midiInputs.length);
        }

        for(let i in _midiOutputs){
            let o=_midiOutputs[i];
            $('select#midiOutputs').append($('<option>', {value:o.id,text:o.name}));
        }
        if(_midiOutputs.length>4){
            $('select#midiOutputs').attr('size', _midiOutputs.length);
        }

        $('.overlay').hide();
    }


    /*
	$.onMIDIInit=function(midi) {

        midiAccess = midi;

        $.MIDIMessageEventHandler=function(event){

            var msg=event.data[0];
            var midichannel=event.data[0] & 0x0f;
            var type=msg & 0xf0;
            if(type==0xf0){
                continues++;
                return;
            }
            //do something with CC's
            console.info('$.MIDIMessageEventHandler(event)',event);
            //logs.push({'t':new Date(),'msg':msg,'e':event});
        }

        var ins=$.midiInputs();
		var out=$.midiOutputs();
		for(var i in ins){
			var a=ins[i];
			var s=document.getElementById("midiInput");
		    var o=document.createElement("option");
		    o.value=a.id;
		    o.text=a.name;
		    s.add(o);
		}
		for(var i in out){
			var a=out[i];
			var s=document.getElementById("midiOutput");
		    var o=document.createElement("option");
		    o.value=a.id;
		    o.text=a.name;
		    s.add(o);
		}

        $('.overlay').hide();
    }


    $.onMIDIReject=function(err) {
        console.error(err);
        alert("The MIDI system failed to start");
    }
    */
   
});