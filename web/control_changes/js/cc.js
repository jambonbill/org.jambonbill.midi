// jambonbill cc.js
$(function(){

    var config={
        'name':'new',
        'comment':'',
        'midiInput':'',
        'midiOutput':'',
        'midichannel':'',
        'widgets':[]
    };
    var _notes=[];//notes being played

	$.onMIDIInit=function(midi) {
        midiAccess = midi;
        console.info('midi init!', midiAccess);

        $.MIDIMessageEventHandler=function(event){

            var msg=event.data[0];
            var midichannel=event.data[0] & 0x0f;
            var type=msg & 0xf0;
            var a=event.data[1];
            var b=event.data[2];
            switch(type){

                case 0xb0:    //CC
                    console.log("CC#"+a, "Chan#"+(midichannel+1), b);
                    $('footer.main-footer').html("Incoming CC#"+a + " Val:"+b);
                    break;

                case 0xc0://'Program change'
                    $('footer.main-footer').html("Prg change#"+a);
                    break;

                case 0xf0://con
                    //continues++;
                    break;

                default:
                    console.info('$.MIDIMessageEventHandler(event)',event);
                    break;
            }
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

       // $( "#sortable" ).sortable();
        //$( "#sortable" ).disableSelection();

        $('.overlay').hide();
    }


    $.onMIDIReject=function(err) {
        console.error("The MIDI system failed to start.");
        alert("The MIDI system failed to start.");
    }

    function noteOn(midinote){

        for(var i in _notes)
            if(_notes[i]==midinote)return;//dont play it twice

        //console.info('noteOn(midinote)');
        var chan=+$('select#midiChannel').val();
        var portId=$('select#midiOutput').val();
        var noteOnMessage = [0x90+chan, midinote, 0x7f];    // note on, middle C, full velocity
        var output = midiAccess.outputs.get(portId);
        output.send( noteOnMessage );
        _notes.push(midinote);
    }

    function noteOff(midinote){
        //console.info('noteOff(midinote)');
        var chan=+$('select#midiChannel').val();
        var portId=$('select#midiOutput').val();
        var output = midiAccess.outputs.get(portId);
        output.send( [0x80+chan, midinote, 0x40]);// note off
        var nn=[];//new note buffer
        for(var i in _notes){
            if(_notes[i]!=midinote)nn.push(_notes[i]);
        }
        _notes=nn;
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

        if(chan<0||chan>16){
            return false;
        }

        var portId=$('select#midiOutput').val();
        var output=midiAccess.outputs.get(portId);
        if(!output) {
            console.error('!output');
            return false;
        }
        output.send( [0xB0+chan, +ccNumber, +value] );
        console.info('sendMidiCC',+chan,+ccNumber,+value);
        return true;
    }


    // Keyboard //
    _octave=2;
    $("body").keydown(function(e) {
        if (["INPUT","SELECT","TEXTAREA"].indexOf(e.target.nodeName) !== -1) return;
        var n=keyCodeToMidiNote(e.keyCode);
        if(!n)return;
        noteOn(n+(_octave*12));
    });

    $("body").keyup(function(e) {
        if (["INPUT","SELECT","TEXTAREA"].indexOf(e.target.nodeName) !== -1) return;
        var n=keyCodeToMidiNote(e.keyCode);
        if(!n)return;
        noteOff(n+(_octave*12));
    });


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



    






    $('a#btnAdd').click(function(){
        console.info('btnAdd');
        var ccn=+prompt("CC#",0);
        if(ccn>128)return;
        config.widgets.push(itemCC("range",+ccn));
        makeItReal();
    });


    $('a#btnClearAll').click(function(){
        console.info("Clear all");
        clearLib();
        makeItReal();
    });


    $('a#btnSaveConf').click(function(){
        console.info('a#btnSaveConf');

        var filename="ccConfig.json";
        filename=prompt("Enter filename",filename);
        if(!filename)return false;

        var data = JSON.stringify(config);
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });




    //var cclib=[];//list of widgets/cc binding

    function itemCC(type,n){
    	return {
    		'type':type,
    		'name':type+' #'+n,
    		'ccnum':+n,
            'value':0,
    		'channel':0
    	}
    }

    function clearLib(){
        //cclib=[];
        config.widgets=[];
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
        console.info('makeItReal()');
        
        saveToLocalStorage();

        $('div#ccboxes').html('');

        for(var i in config.widgets){
    		var o=config.widgets[i];
    		console.log(o);
            var htm='<div class="col-sm-3 connectedSortable ui-sortable">';
            htm+=whtml(i);
            htm+='</div>';
            $('div#ccboxes').append(htm);
    	}
        // bind events //
        $('input[type=range]').change(function(e){
            console.log('value',e.currentTarget.value);
            var W=config.widgets[e.currentTarget.dataset.i];
            W.value=e.currentTarget.value;
            
            var chan=+$('select#midiChannel').val();
            console.warn("chan="+chan);
            sendMidiCC(chan,W.ccnum,W.value);
        });

        $('button.btn-edit').click(function(e){
            var i=e.currentTarget.dataset.i;
            //console.log(e.currentTarget.dataset.i);
            var W=config.widgets[i];
            var name=prompt("Widget name", W.name);
            if(name){
                W.name=name;
                makeItReal();
            }
        });
    }

    function whtml(i){

        var o=config.widgets[i];
        var name=o.name;
        var type=o.type;
        var ccnum=o.ccnum;
        var value=o.value;
        var channel=0;

        if(ccnum==NaN){
            console.error(o);
            return;
        }

        var htm='<div class="box box-solid">';
        htm+='<div class="box-header ui-sortable-handle" style="cursor: move">';
        htm+='<h3 class="box-title"><i class="fa fa-text"></i> '+name+'</h3>';

        htm+='<div class="pull-right box-tools">';
        htm+='<button class="btn btn-box-tool btn-edit" title="Edit" data-i='+i+' data-num='+ccnum+'><i class="fa fa-edit"></i></button>';
        //htm+='<button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove"><i class="fa fa-times"></i></button>';
        htm+='</div>';

        htm+='</div>';
        htm+='<div class="box-body" style="">';
        htm+='<div class="row">';
            htm+='<div class="col-sm-12">';
            htm+='<label>CC#0x'+ccnum.toString(16).toUpperCase()+'</label>';
            htm+='<input type="range" data-i='+i+' value='+value+' max="127">';
            //htm+='<button class="btn btn-lg btn-default">CC#00</button></div>';
            htm+='</div>';
        htm+='</div>';
        //htm+='<div class="overlay" style="display: none;"><i class="fa fa-refresh fa-spin"></i></div>';
        htm+='</div>';
        return htm;
    }







    // Save current state to localStorage
    function saveToLocalStorage(){
        // store everything to local storage
        var data = JSON.stringify(config);
        var ko=Math.round(data.length/1024);
        try{
            localStorage.setItem('midiCCConfig',data);
            //console.log(ko + "kb saved to localStorage");
        }
        catch(e){
            console.error("Error saving "+ko+"kb to localStorage")
            //alert();
        }
        return true;
    }

    function refreshByLocalstorage(){
        
        //console.info('refreshByLocalstorage()');
        var str;
        var data;
        try{
            str=localStorage.getItem('midiCCConfig');
            if(str.length>10){
                data = JSON.parse(str);
            }else{
                return;
            }
        }
        catch(e){
            console.log("Error decoding localStorage data");
            return;
        }
        
        //console.log('refreshByLocalstorage','data.length='+Math.round(str.length/1024)+"k");
        if (data) {
            config=data;
            makeItReal();
        }
    }
    

	console.info("cc.js");
    refreshByLocalstorage();
});