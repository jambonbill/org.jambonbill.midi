// jambonbill opafm.js
/*
var sdump=event.data;
console.log('sdump.length='+sdump.length);
if (sdump.length==1036) {
    notification("Sysex dump received","now calm down");
    console.log(sdump);
    SID.load(sdump);
    var data=SID.decode();
    console.log(data);
    var blob = new Blob([sdump], {type: "application/octet-stream"});
    return;
}

var hstr='';
for(var i in sdump){
    //console.log(sdump[i]);
    var hx=sdump[i].toString(16);
    if(hx.length==1)hx='0'+hx;
    hstr+=hx.toUpperCase();
}
*/

$(function(){

    "use strict";

    let _midiAccess=null;  // the MIDIAccess object.
    let _midiChannel=0;
    let _midiInputs;
    let _midiOutputs;
    let _midiReady=false;
    let _sysex=[];

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    }else{
        console.warn("No MIDI support present in your browser");
    }

    function onMIDIInit(midi) {

        console.log('onMIDIInit(midi)',midi);

        _midiAccess = midi;

        let haveAtLeastOneDevice=false;
        let inputs=_midiAccess.inputs.values();
        let outputs=_midiAccess.outputs.values();

        _midiInputs=[];
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            haveAtLeastOneDevice = true;
            _midiInputs.push(input.value);
        }

        _midiOutputs=[];
        for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
            //console.log(output);
            _midiOutputs.push(output.value);
        }

        if (!haveAtLeastOneDevice){
            console.warn("No MIDI input devices present.");
        }else{
            console.info('MIDI ready');
            _midiReady=true;
            init();
        }
    }

    function onMIDIReject(err){console.error("MIDI system failed to start")}

    window.init=function(){

        console.log('init()');

         for(let i in _midiInputs){
            let a=_midiInputs[i];
            let s=document.getElementById("midiInput");
            let o=document.createElement("option");
            o.value=a.id;
            o.text=a.name;
            s.add(o);
        }

        var detected=false;
        for(let i in _midiOutputs){
            let a=_midiOutputs[i];
            //console.log(a);
            let s=document.getElementById("midiOutput");
            let o=document.createElement("option");
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


        //reload last patch

        //Patch Name

        //Algorithm
        var val=ccStore(8);
        //if(val)$('select#algorithm').val(val);

        // Volume
        // var vol=ccStore(9);
        // if(vol)$('select#algorithm').val(vol);

        var ranges=$('input[type=range]');
        for(var i=0;i<ranges.length;i++){

            if(!ranges[i].dataset){
                console.warn(i);
                continue;
            }

            var cc=ranges[i].dataset.cc;
            if(cc<16)continue;

            var val=ccStore(cc);

            if(val){
                ranges[i].value=val;
                $(ranges[i]).prev().html(ranges[i].name+": "+val*2);
                //sendMidiCC(+$('select#midiChannel').val(),cc,val);
            }
        }
        //sendAll();

        $('.overlay').hide();
    }





    function MIDIMessageEventHandler(event){

        var sdump=event.data;
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
                var hstr='';
                for(var i in sdump){
                    //console.log(sdump[i]);
                    var hx=sdump[i].toString(16);
                    if(hx.length==1)hx='0'+hx;
                    hstr+=hx.toUpperCase();
                }

                if (hstr=='F000007E4B000FF7') {
                    notification("Ping received!","now we're talking");
                }

                break;
        }
    }



    function noteOn(midinote,velocity){

        for(let i in _notes)
            if(_notes[i]==midinote)return;//dont play it twice

        //console.info('noteOn(midinote)');
        let chan=+$('select#midiChannel').val();
        let portId=$('select#midiOutput').val();
        let velo=0x7f;
        if(velocity)velo=velocity;
        let noteOnMessage = [0x90+chan, midinote, velo];    // note on, middle C, full velocity
        let output = _midiAccess.outputs.get(portId);
        output.send( noteOnMessage );
        _notes.push(midinote);
    }

    function noteOff(midinote){
        //console.info('noteOff(midinote)');
        let chan=+$('select#midiChannel').val();
        let portId=$('select#midiOutput').val();
        let output = _midiAccess.outputs.get(portId);
        output.send( [0x80+chan, midinote, 0x40]);// note off
        let nn=[];//new note buffer
        for(let i in _notes){
            if(_notes[i]!=midinote)nn.push(_notes[i]);
        }
        _notes=nn;
    }


    var sendMidiCC=function(chan,ccNumber,value){// Send control change

        console.log('sendMidiCC',chan,ccNumber,value);


        if(chan<0||chan>16){
            return false;
        }

        if(ccNumber==NaN)return false;
        if(value==NaN)return false;

        let portId=$('select#midiOutput').val();
        let output=_midiAccess.outputs.get(portId);

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
        var output=_midiAccess.outputs.get(portId);
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
        var n=keyCodeToMidiNote(e.keyCode);
        if(typeof(n)!='number')return;
        noteOn(n+(_octave*12));
    });

    $("body").keyup(function(e) {
        if (["INPUT","SELECT","TEXTAREA"].indexOf(e.target.nodeName) !== -1) {
            if(e.target.type!='range')return;
        }
        var n=keyCodeToMidiNote(e.keyCode);
        if(typeof(n)!='number')return;
        noteOff(n+(_octave*12));
    });


    window.panic=function(){//kill all playing notes in case something is stuck
        console.warn('panic');
        for(let i in _notes)
            noteOff(_notes[i]);
    }


    $('button.algorithm').click(function(e){
		//console.log(e.currentTarget.dataset.id);
		selectAlgorithm(e.currentTarget.dataset.id);
	});



    window.selectAlgorithm=function(n){
		console.info('selectAlgorithm('+n+')');
        ccStore(8,n);
        let chan=+$('select#midiChannel').val();
        sendMidiCC(chan, 8, n);
        $('#btnAlgorithm').text('Algorithm #'+(n+1));
        $('#modalAlgorithm').modal('hide');
	}



    $('input').change(function(e){
		var val=e.currentTarget.value;
		var name=e.currentTarget.name;
		var CC=e.currentTarget.dataset.cc;
        if(!CC)return false;
        //localStorage['CC'+CC]=val;
		ccStore(CC,val);
        $(this).prev().html(name+" : "+e.currentTarget.value*2);
        //console.info('CC='+CC,"value="+val);
        sendMidiCC(+$('select#midiChannel').val(),CC,val);
	});



    /**
     * CC Storage interface (get/set)
     * @param  {[type]} cc    [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    function ccStore(cc,value){

        if(cc===NaN)return false;
        if(cc>127)return false;
        if(value){
            localStorage['OPACC'+cc]=value;
        }
        return localStorage['OPACC'+cc];
    }


    $('#btnAlgorithm').click(function(){
        console.log('click');
        $('#modalAlgorithm').modal('show');
    });

    /*
    $('select#algorithm').change(function(){
        selectAlgorithm($('select#algorithm').val());
    });
    */

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


    $('#btnOpenXML').click(function(){
        console.info('btnOpen', patches);
        $('#modalPatches').modal('show');
        //$('#loadFromJSON').click();
	});

    $('#loadFromJSON').change(function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.target.files[0];
        var reader = new FileReader();
        var data = false;
        reader.onload = (function(theFile) {
            return function(e) {
                data = JSON.parse(e.target.result);
                if (!data) return;
                refreshEditorByJSON(data);
            }
        })(file);
        reader.readAsText(file);
        $('#modalOpen').modal('hide');
    });

    function refreshEditorByJSON(data){
        console.log(data);
        $('#patchname').val(data.name);
        for(var cc in data.ccs){
            console.log(cc,data.ccs[cc]);
            if (cc) {
                //$('#').val(cc);
                ccStore(cc,data.ccs[cc]);
                //sendMidiCC(cc,val);
            }
        }
        // now update interface
        // TODO
    };



    function loadXmlPatch(filename){
        console.info('loadPatch(filename)',filename);
        $('.overlay').show();
        $.post('ctrl.php',{'do':'load','filename':filename},function(json){
            $('.overlay').hide();
            console.log(json);

        }).fail(function(e){
            console.error(e.responseText);
        });
    }

    /*
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
    */

	$('#btnSave').click(function(){
		console.info('btnSave');
        var data = JSON.stringify(makeJSON());
        var el = document.createElement('a');
        el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        el.setAttribute('download', "FM_"+$('#patchname').val()+".json");
        el.style.display = 'none';
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
	});


    $('#btnPing').click(function(){

        // Make sure you send the ping to the arduino board !
        var _portId=$('select#midiOutput').val();
        if (!_portId) {
            console.warn('!portid');
            return;
        }

        console.log('click ping');
        var device_number=0x00;
        var output = _midiAccess.outputs.get(_portId);
        try{
            output.send( [0xF0,0x00,0x00,0x7E,0x4B, device_number, 0x0F,0xF7]);
        }
        catch(e){
            console.error(e.message);
        }

    });

    $('#btnPanic').click(function(){
        panic();
    });


	$('#btnRandom').click(function(){
        randomPatch();
	});


    window.randomPatch=function(){

        console.info('btnRandom');
        $('#patchname').val("RANDOM");

        var ranges=$('input[type=range]');

        selectAlgorithm(rnd(13));

        for(let i=0;i<ranges.length;i++){

            if(!ranges[i].dataset){
                console.warn(i);
                continue;
            }

            let cc=ranges[i].dataset.cc;
            if(cc<16)continue;

            let rndval=rnd(127);

            // TODO : LIMIT RELEASE
            switch(cc){
                case "23":
                case "39":
                case "55":
                case "71":
                    rndval=Math.random()*32;
                    break;

            }
            // TODO : FORCE IN TUNE



            ranges[i].value=Math.round(rndval);

            $(ranges[i]).prev().html(ranges[i].name+": "+ranges[i].value*2);

            sendMidiCC(+$('select#midiChannel').val(),cc,ranges[i].value);
        }

        //random Algorithm
        var algonum=Math.round(Math.random()*12)+1;
        $('#algorithm').val(algonum);
        sendMidiCC(+$('select#midiChannel').val(),8,algonum);
    }

    $('#btnResend').click(function(){
        sendAll();
    });

    function sendAll(){

        console.info('sendAll()');

        //Volume
        //Algorithm
        //Panning
        //Flags

        // Operators //
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
    }

    function makeJSON(){

        var js={
            'name':$('#patchname').val(),
            'ccs':[]
        };

        var ranges=$('input[type=range]');
        for(var i=0;i<ranges.length;i++){

            if(!ranges[i].dataset){
                console.warn(i);
                continue;
            }
            var cc=ranges[i].dataset.cc;
            var val=+ranges[i].value;
            js.ccs[cc]=val;
        }
        return js;
    }


    $('#btnDownload').click(function(){
        alert("Not yet!");
    });


    $('#btnLoad').click(function(){//81
        var p=prompt("Enter program number to load",0);
        if(p>104)return;
        console.info('opa.loadInternal');
        sendMidiCC(+$('select#midiChannel').val(),81,p);
    });


    $('#btnStore').click(function(){//80
        var p=prompt("Enter program number to STORE",0);
        if(p>104)return;
        console.info('opa.storeInternal');
        sendMidiCC(+$('select#midiChannel').val(),82,p);
    });


    $('#btnKill1').click(function(){//82
        console.warn("allNotesOff");
        sendMidiCC(+$('select#midiChannel').val(),82,0);
    });


    $('#btnKill2').click(function(){//83
        console.warn("allSoundsOff");
        sendMidiCC(+$('select#midiChannel').val(),83,0);
    });


    function rnd(n){
        return Math.round(Math.random()*n);
    }


    var patches=[];
    function getPatches(){
        console.info('getPatches()');
        $.post('ctrl.php',{'do':'list'},function(json){
            console.log(json);
            patches=json.list;
        }).fail(function(e){
            console.error(e.responseText);
        });
    }

	getPatches();

});