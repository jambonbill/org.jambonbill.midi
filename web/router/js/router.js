$(function(){

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

    console.log('router.js',midiAccess);
});