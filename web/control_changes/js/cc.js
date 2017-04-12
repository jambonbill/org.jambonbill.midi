// jambonbill cc.js

$(function(){

	$.onMIDIInit=function(midi) {                
        midiAccess = midi;
        console.info('midi init!', midiAccess);
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
        console.error("The MIDI system failed to start.");
        alert("The MIDI system failed to start.");
    }	


	$('input').change(function(e){
		var val=e.currentTarget.value;
		var nam=e.currentTarget.name;
		var OP=e.currentTarget.dataset.op;
		console.info('OP='+OP,"name="+nam,"value="+val);
	});

	/*
	$('#btnOpen').click(function(){
		console.info('btnOpen');
	});

	$('#btnSave').click(function(){
		console.info('btnSave');
	});

	$('#btnTest').click(function(){
		console.info('btnTest');
	});

	*/


	var midiNote=function(chan,midinote,length) {
      	
      	var chan=0;
        if(chan<0||chan>16){
            return false;
        }

        if(midinote<0)return false;
        if(midinote>128)return false;
        
        if(!portId()){
            console.warn('!portID');
            return false;
        }

        var len=500.0;
        if(length>0)len=length;
      
        var noteOnMessage = [0x90+chan, midinote, 0x7f];    // note on, middle C, full velocity
        var portId=$('select#midiOutput').val();
        var output = midiAccess.outputs.get(portId);
		if(!output){
            console.error('!output');
            return false;
        }
        output.send( noteOnMessage );  //omitting the timestamp means send immediately.
        output.send( [0x80+chan, midinote, 0x40], window.performance.now() + len ); // Inlined array creation- note off, middle C,                                                                        // release velocity = 64, timestamp = now + 1000ms.
        return true;
    }


    //http://www.blitter.com/~russtopia/MIDI/~jglatt/tech/midispec/pgm.htm
    var sendPrgChange=function(chan,value)
    {
        var chan=0;
        
        if(chan<0||chan>16){
            return false;
        }

        
        var portId=$('select#midiOutput').val();
        var output=midiAccess.outputs.get(portId);
        if(!output){
            console.error('!output');
            return false;
        }
        output.send( [0xC0+chan, value] ); 
        return true;
    }

    
    // Send control change
    // http://www.blitter.com/~russtopia/MIDI/~jglatt/tech/midispec/ctllist.htm
    var sendMidiCC=function(chan,ccNumber,value)
    {
        var chan=0;
        if(chan<0||chan>16){
            return false;
        }
        
        var portId=$('select#midiOutput').val();
        var output=midiAccess.outputs.get(portId);
        if(!output) {
            console.error('!output');
            return false;
        }
        output.send( [0xB0+chan, ccNumber, value] );
        return true;
    }


    var cclib=[];

    function itemCC(type,n){
    	return {
    		'type':type,
    		'name':type+' #'+n,
    		'ccnum':n,
    		'value':0
    	}
    }


    function newLib(){
    	console.info('newLib()',cclib);
    	cclib=[];
    	for(var i=0;i<8;i++){
    		cclib.push(itemCC("range",i));
    	}
    }

    function makeItReal(){
    	newLib();
    	console.info('makeItReal()',cclib);
    	for(var i in cclib){
    		var o=cclib[i];
    		console.log(o);
    	}
    }

    makeItReal();
	
	console.info("cc.js");
});