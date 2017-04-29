// jambonbill opafm.js
// http://www.w3.org/TR/webmidi/#examples-of-web-midi-api-usage-in-javascript
$(function(){

	$.onMIDIInit=function(midi) {
        midiAccess = midi;

        $.MIDIMessageEventHandler=function(event){

            var msg=event.data[0];
            var midichannel=event.data[0] & 0x0f;
            var type=msg & 0xf0;
            var a=event.data[1];
            var b=event.data[2];
            switch(type){

                case 0x80://note off
                    noteOff(a);
                    //$('footer.main-footer').html("Incoming Note off "+a + " Velo:"+b);
                    break;

                case 0x90://note on
                    noteOn(a,b);
                    //$('footer.main-footer').html("Incoming Note on "+a + " Val:"+b);
                    break;

                case 0xc0://'Program change'
                    //$('footer.main-footer').html("Incoming Prg change #"+a);
                    break;

                case 0xe0://'Pitch wheel'
                    pitchBend(a,b);
                    break;

                default:
                    //console.info('$.MIDIMessageEventHandler(event)',event);
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

        var detected=false;
		for(var i in out){
			var a=out[i];
			var s=document.getElementById("midiOutput");
		    var o=document.createElement("option");
		    o.value=a.id;
		    o.text=a.name;
		    s.add(o);
            if(/Arduino/.test(a.name)){
                detected=a.id;
            }
		}

        // Try to select the Arduino from the midi out list //
        if (detected) {
            $('#midiOutput').val(detected);
        }
        // Auto Forward midi notes to the output

        $('.overlay').hide();
    }

    $.onMIDIReject=function(err) {
        console.error("The MIDI system failed to start.",err);
        alert("The MIDI system failed to start");
    }


    function noteOn(midinote,velocity){

        for(var i in _notes)
            if(_notes[i]==midinote)return;//dont play it twice

        //console.info('noteOn(midinote)');
        var chan=+$('select#midiChannel').val();
        var portId=$('select#midiOutput').val();
        var velo=0x7f;
        if(velocity)velo=velocity;
        var noteOnMessage = [0x90+chan, midinote, velo];    // note on, middle C, full velocity
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

    // Send control change
    var sendMidiCC=function(chan,ccNumber,value){

        if(chan<0||chan>16){
            return false;
        }

        if(ccNumber==NaN)return false;
        if(value==NaN)return false;

        var portId=$('select#midiOutput').val();
        var output=midiAccess.outputs.get(portId);
        if (!output) {
            console.error('!output');
            return false;
        }
        output.send( [0xB0+chan, +ccNumber, +value] );
        console.info('sendMidiCC',+chan,+ccNumber,+value);
        return true;
    }


    function pitchBend(coarse, fine){
        var chan=+$('select#midiChannel').val();
        var portId=$('select#midiOutput').val();
        var output=midiAccess.outputs.get(portId);
        if (!output) {
            console.error('!output');
            return false;
        }
        output.send( [0xe0+chan, +coarse, +fine] );
        console.info('pitchBend',+chan,+coarse,+fine);
        return true;
    }
    //pitchBend(OPA_PROGRAMS program, int8_t coarse, int8_t fine);




    // Keyboard //
    var _notes=[];
    var _octave=2;
    $("body").keydown(function(e) {
        //console.log(e.target,e.target.type);
        if (["INPUT","SELECT","TEXTAREA"].indexOf(e.target.nodeName) !== -1){
          if(e.target.type!='range')return;
        }
        var n=$.keyCodeToMidiNote(e.keyCode);
        if(typeof(n)!='number')return;
        noteOn(n+(_octave*12));
    });

    $("body").keyup(function(e) {
        if (["INPUT","SELECT","TEXTAREA"].indexOf(e.target.nodeName) !== -1) {
            if(e.target.type!='range')return;
        }
        var n=$.keyCodeToMidiNote(e.keyCode);
        if(typeof(n)!='number')return;
        noteOff(n+(_octave*12));
    });

	$('button.algorithm').click(function(e){
		//console.log(e.currentTarget.dataset.id);
		selectAlgorithm(e.currentTarget.dataset.id);
	});


    function selectAlgorithm(n){
		console.info('selectAlgorithm(n)',n);
		//$("button.algorithm").find("[data-id='"+n+"']").removeClass('active');
		//$("button.algorithm").find("[data-id='"+n+"']").addClass('active');
        sendMidiCC(+$('select#midiChannel').val(),8,n);
	}


    $('select#algorithm').change(function(){
        selectAlgorithm($('select#algorithm').val());
    });


    $('input').change(function(e){
		var val=e.currentTarget.value;
		var name=e.currentTarget.name;
		var CC=e.currentTarget.dataset.cc;
        if(!CC)return false;
        localStorage['CC'+CC]=val;
		$(this).prev().html(name+" : "+e.currentTarget.value*2);
        //console.info('CC='+CC,"value="+val);
        sendMidiCC(+$('select#midiChannel').val(),CC,val);
	});


    $('#btnNew').click(function(){
        if(!confirm("Clear all ?"))return;

        $('#patchname').val("New");

        var ranges=$('input[type=range]');
        for(var i=0;i<ranges.length;i++){
            if(!ranges[i].dataset){
                console.warn(i);
                continue;
            }
            var cc=ranges[i].dataset.cc;
            if(cc<16)continue;
            ranges[i].value=0;
            sendMidiCC(+$('select#midiChannel').val(),cc,ranges[i].value);
        }
        //Algorithm1
        var algonum=1;
        $('#algorithm').val(algonum);
        sendMidiCC(+$('select#midiChannel').val(),8,algonum);
    });


    $('#btnOpen').click(function(){

        console.info('btnOpen', patches);

        function displayPatchList(){

            console.info('displayPatchList()');

            var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';
            htm+='<thead>';
            htm+='<th>File</th>';
            htm+='<th>Name</th>';
            htm+='</thead>';
            htm+='<tbody>';
            for(var i in patches){
                var o=patches[i];
                htm+='<tr data-filename="'+o.file+'">';
                htm+='<td>'+o.file;
                htm+='<td>'+o.name;
            }
            htm+='</tbody>';
            htm+='</table>';

            $('#modalPatches .modal-body').html(htm);
            $('#modalPatches tbody>tr').click(function(e){
                $('#modalPatches').modal('hide');
                loadPatch(e.currentTarget.dataset.filename);
            });
        }

        displayPatchList();

        $('#modalPatches').modal('show');
	});

    function loadPatch(filename){
        console.info('loadPatch(filename)',filename);
        $('.overlay').show();
        $.post('ctrl.php',{'do':'load','filename':filename},function(json){
            $('.overlay').hide();
            console.log(json);

        }).error(function(e){
            console.error(e.responseText);
        });
    }

	$('#btnSave').click(function(){
		console.info('btnSave');
	});

	$('#btnRandom').click(function(){
		console.info('btnRandom');
        $('#patchname').val("RANDOM");
        var ranges=$('input[type=range]');



        for(var i=0;i<ranges.length;i++){

            if(!ranges[i].dataset){
                console.warn(i);
                continue;
            }

            // TODO : LIMIT RELEASE
            // TODO : FORCE IN TUNE

            var cc=ranges[i].dataset.cc;
            if(cc<16)continue;
            ranges[i].value=Math.round(Math.random()*127);
            $(ranges[i]).prev().html(ranges[i].name+": "+ranges[i].value*2);
            sendMidiCC(+$('select#midiChannel').val(),cc,ranges[i].value);
        }

        //random Algorithm
        var algonum=Math.round(Math.random()*12)+1;
        $('#algorithm').val(algonum);
        sendMidiCC(+$('select#midiChannel').val(),8,algonum);
	});

    $('#btnResend').click(function(){
        var ranges=$('input[type=range]');
        for(var i=0;i<ranges.length;i++){
            if(!ranges[i].dataset){
                console.warn(i);
                continue;
            }

            $(ranges[i]).prev().html(ranges[i].name+": "+ranges[i].value*2);

            var cc=ranges[i].dataset.cc;
            if(cc<16)continue;

            sendMidiCC(+$('select#midiChannel').val(),cc,ranges[i].value);
        }
    });


    var patches=[];
    function getPatches(){
        console.info('getPatches()');
        $.post('ctrl.php',{'do':'list'},function(json){
            console.log(json);
            patches=json.list;
        }).error(function(e){
            console.error(e.responseText);
        });
    }

	getPatches();
});