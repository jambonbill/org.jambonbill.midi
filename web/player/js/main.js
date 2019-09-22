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
$(()=>{
    'use strict';
    let ls=localStorage;
    let _midiAccess=null;  // the MIDIAccess object.
    let _midiChannel=0;
    let _midiInputs;
    let _midiOutputs;
    let _midiPortId;
    let _ready=false;
    let logs=[];

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess({sysex:false}).then( onMIDIInit, onMIDIReject );
    }else{
        console.warn("No MIDI support present in your browser");
    }

    function onMIDIInit(midi) {
        //console.log('onMIDIInit(midi)',midi);
        _midiAccess = midi;

        listInputs();
        listOutputs();
        displayOutputs();

        function listInputs(){
            _midiInputs=[];
            let inputs=midi.inputs.values();
            for ( let input = inputs.next(); input && !input.done; input = inputs.next()) {
                _midiInputs.push(input.value);
            }
            return true;
        }

        function listOutputs(){
            _midiOutputs=[];
            let outputs=midi.outputs.values();
            for ( let output = outputs.next(); output && !output.done; output = outputs.next()) {
                _midiOutputs.push(output.value);
            }
            return true;
        }

        midi.onstatechange=function(d){
            if(!_ready)return false;
            let p=d.port;
            console.info(p.type, p.name, p.connection);
            //console.log("onstatechange d",d.port);
            listInputs();
            listOutputs();
            displayOutputs();
            //console.log('_midiAccess.onstatechange', _midiInputs.length, _midiOutputs.length);
        };

        if (_midiInputs.length==0){
            console.warn("No MIDI input devices present.");
        }else{
            console.info('MIDI ready');
            _ready=true;
            init();
        }
    }

    window.portId=()=>_midiPortId;

    window.MIDIoutput=()=>{
        return _midiAccess.outputs.get(_midiPortId);
    }

    function displayOutputs(){

        console.log('displayOutputs()', _midiOutputs);

        let dat=_midiOutputs;
        let str=$('#search').val();
        let htm='<table class="table table-sm table-hover" style="cursor:pointer">';
        let num=0;

        htm+='<thead>';
        htm+='<th width=20>#</th>';
        htm+='<th>Output name</th>';
        htm+='</thead>';

        htm+='<tbody>';
        for(let i in dat){
            if(str){
                let reg=new RegExp(str,'i');
                let match=false;
                //if(reg.test(o.xx))match=true;
                if(!match)continue;
            }
            let o=dat[i];
            //console.log(o);
            htm+='<tr data-id="'+o.id+'" title="'+o.id+'">';
            htm+='<td><i class="text-muted">'+i+'</i>';
            htm+='<td>'+o.name;
            num++;
        }
        htm+='</tbody>';
        htm+='</table>';

        if (num>0) {
            //htm+='<i class="text-muted">'+dat.length+' record(s)</i>';
        } else {
        htm='<div class="p-4"><div class="alert alert-secondary" role="alert">no data</div></div>';
        }


        $('#boxOutputs .card-body').html(htm);
        $('#boxOutputs table').tablesorter();
        $('#boxOutputs tbody>tr').click(function(){
            //$('.overlay').show();
            $('#boxOutputs tbody>tr').removeClass('bg-primary')
            $(this).addClass('bg-primary')
            console.log($(this).data('id'));
            _midiPortId=$(this).data('id');
        });
    }


    function midiNoteToString(n){
        let note=n%12;
        let notes=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
        let oct=Math.floor(n/12);
        return notes[note]+oct;
    }

    function init(){
        console.log('init');
        $('.overlay').hide();
    }


    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
    }


    function msgType(msg,b1,b2){
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
            0xe0:'Pitch wheel',
            0xf0:'Continue'
        }
        switch(msg){
            case 0x90:
                return   msgtypes[msg] + " <i class='text-muted'>"+midiNoteToString(b1)+"</i>";
            case 0xb0:
                return   msgtypes[msg] + " <i class='text-muted'>#0</i>";
        }
        return msgtypes[msg];
    }

    function dispLog(){
        if(logs.length>20)logs.shift();

        let htm='<table class="table table-hover table-sm">';

        htm+='<thead>';
        //htm+='<th width=140>Time</th>';
        htm+='<th>Type</th>';
        htm+='<th width=60>Msg</th>';
        htm+='<th width=50 style="text-align:right">Chn</th>';
        htm+='<th width=60 style="text-align:right">B1</th>';
        htm+='<th width=60 style="text-align:right">B2</th>';
        htm+='</thead>';

        htm+='<tbody>';
        for(let i=0;i<logs.length;i++){
          let o=logs[i];
          let t=o.t;
          let msg=o.e.data[0];
          let midichannel=msg & 0x0f;
          let B1=o.e.data[1];
          let B2=o.e.data[2];

          htm+='<tr>';
          //htm+='<td>'+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()+"-"+t.getMilliseconds();
          //var msgtype=table-condensed

          htm+='<td>'+msgType(msg,B1,B2);
          htm+='<td>0x'+msg.toString(16);

          htm+='<td style="text-align:right">'+(midichannel+1);

          htm+='<td style="text-align:right">';//B1
          if(B1)htm+=B1;

          htm+='<td style="text-align:right">';//B2
          if(B2)htm+=B2;
          //htm+='<td>';
        }
        htm+='</tbody>';
        htm+='</table>';

        $('#boxIncoming .card-body').html(htm);
    }


    function clearLogs(){
      console.log('clearLogs()');
      logs=[];
      dispLog();
    }

});