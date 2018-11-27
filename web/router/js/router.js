$(function(){

    'use strict';

    let _midiAccess=null;  // the MIDIAccess object.
    let _midiChannel=0;
    let _midiInputs;
    let _midiOutputs;
    let _midiReady=false;
    let _portId=false;

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
            //input.value.onmidimessage = MIDIMessageEventHandler;
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
            o.onmidimessage = MIDIMessageEventHandler;
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

    $('select#midiOutputs').change(function(){
        
        _portId=$('select#midiOutputs').val();
        console.log('change',_portId);
    });

    /*  
    0x80     Note Off
    0x90     Note On
    0xA0     Aftertouch
    0xB0     Continuous controller
    0xC0     Patch change
    0xD0     Channel Pressure
    0xE0     Pitch bend
    0xF0     (non-musical commands)
    */
    function MIDIMessageEventHandler(event){
        
        //console.log(event);

        let msg=event.data[0];
        let midichannel=event.data[0] & 0x0f;
        let type=msg & 0xf0;
    
        if(_portId){
            let output = _midiAccess.outputs.get(_portId);
            output.send( event.data );//maybe ?    
        }
        

        // Mask off the lower nibble (MIDI channel)
        /*
        switch (event.data[0] & 0xf0) {
        
            case 0x80://note off
                break;


            case 0x90://note on
                break;

            case 0xb0:// CC - Control Change
                var ccNum=event.data[1];
                
                break;
            
            case 0xC0:// Prg Change
                //let output = _midiAccess.outputs.get(_portId);
                //let msg = [0xc0+midiChannel, n];
                //output.send( msg );                
                break;
            
            case 0xe0://pitch
                
                break;
        }
        */
        
    }
   
});