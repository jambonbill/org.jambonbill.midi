// jambonbill cc.js

$(function(){

	$.onMIDIInit=function(midi) {
        midiAccess = midi;
        console.info('midi init!', midiAccess);

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

        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();

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






    $('a#btnAdd').click(function(){
        console.info('btnAdd');
        var ccn=prompt("CC#",0);
        cclib.push(itemCC("range",ccn));
        makeItReal();
        /*
        var htm='<div class="col-sm-3 connectedSortable ui-sortable">';
        htm+=whtml();
        htm+='</div>';
        $('div#ccboxes').append(htm);
        */
    });


    $('a#btnClearAll').click(function(){
        console.info("Clear all");
        clearLib();
        makeItReal();
    });


    $('a#btnSaveConf').click(function(){
        console.info('a#btnSaveConf',cclib);
        var data = JSON.stringify(cclib);
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', "ccConfig.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    var cclib=[];//list of widgets/cc binding

    function itemCC(type,n){
    	return {
    		'type':type,
    		'name':type+' #'+n,
    		'ccnum':n,
            'value':0,
    		'channel':0
    	}
    }

    function clearLib(){
        cclib=[];
    }

    function newLib(){
    	console.info('newLib()',cclib);
    	cclib=[];
    	for(var i=0;i<8;i++){
    		cclib.push(itemCC("range",i));
    	}
    }

    function makeItReal(){

        //newLib();

        console.info('makeItReal()',cclib);

        $('div#ccboxes').html('');

        for(var i in cclib){
    		var o=cclib[i];
    		console.log(o);
            var htm='<div class="col-sm-3 connectedSortable ui-sortable">';
            htm+=whtml(i);
            htm+='</div>';
            $('div#ccboxes').append(htm);
    	}
    }

    function whtml(i){

        var o=cclib[i];
        var name=o.name;
        var type=o.type;
        var ccnum=o.ccnum;
        var value=o.value;
        var channel=0;

        var htm='<div class="box box-solid" id="boxCC">';
        htm+='<div class="box-header ui-sortable-handle" style="cursor: move">';
        htm+='<h3 class="box-title"><i class="fa fa-text"></i> '+name+'</h3>';
        //htm+='<div class="pull-right box-tools"><button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse"><i class="fa fa-minus"></i></button><button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove"><i class="fa fa-times"></i></button></div>';
        htm+='</div>';
        htm+='<div class="box-body" style="">';
        htm+='<div class="row">';
            htm+='<div class="col-sm-12">';
            htm+='<label>CC#'+ccnum+'</label>';
            htm+='<input type="range" id="midi_send" value='+value+' max="127">';
            //htm+='<button class="btn btn-lg btn-default">CC#00</button></div>';
            htm+='</div>';
        htm+='</div>';
            //htm+='<div class="overlay" style="display: none;"><i class="fa fa-refresh fa-spin"></i></div>';
        htm+='</div>';
        return htm;
    }

    makeItReal();

	console.info("cc.js");
});