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
    let _midiReady=false;
    var continues=0;//bpm counter
    var filters={
        chans:[],
        types:[]
    };
    var logs=[];

    if (navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
    }else{
        console.warn("No MIDI support present in your browser");
    }

    function onMIDIInit(midi) {
        //console.log('onMIDIInit(midi)',midi);
        _midiAccess = midi;

        let haveAtLeastOneDevice=false;
        let inputs=_midiAccess.inputs.values();
        let outputs=_midiAccess.outputs.values();

        _midiInputs=[];
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            input.value.onmidimessage = MIDIMessageEventHandler;
            haveAtLeastOneDevice = true;
            _midiInputs.push(input.value);
        }

        if (!haveAtLeastOneDevice){
            console.warn("No MIDI input devices present.");
        }else{
            console.info('MIDI ready');
            _midiReady=true;
            init();
        }
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
        //let B1=event.data[1];
        let B2=event.data[2];

        if(type==0xf0){
            continues++;
        }



        // Filter here
        for(let i in filters.types){
            //if(type==)
            if(type==filters.types[i])return;
            if(type==144&&!B2&&filters.types[i]==128)return;//Fake note off (a `note on` with 0 velocity is a `note off`)
        }

        //console.log(event);

        //logs.push({'t':new Date(),'msg':msg,'chn':midichannel,'b1':event.data[1],'b2':event.data[2]});
        logs.push({'t':new Date(),'msg':msg,'e':event});

        dispLog();
    }

    function midiNoteToString(n){
        let note=n%12;
        let notes=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
        let oct=Math.floor(n/12);
        return notes[note]+oct;
    }

    function init(){
        console.log('init()');
        for(let i in _midiInputs){
            let a=_midiInputs[i];
            var s=document.getElementById("midiInput");
            var o=document.createElement("option");
            o.value=a.id;
            o.text=a.name;
            s.add(o);
        }

        if(_midiInputs.length>4){
            $('select#midiInput').attr('size', _midiInputs.length);
        }

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

    $('#btnClearLogs').click(function(){
        //console.log('btnClear');
        clearLogs();
    });

    $('input.filters').click(function(){
        //console.log('btnFilter');
        filters.types=[];//global
        $('input.filters').each(function(i,e){
          if(e.checked)filters.types.push(+e.value);
          //console.log(i,e.value,e.checked);
        });
        console.log(filters);
        ls.setItem("midifilters",JSON.stringify(filters));
    });

    //Load
    let flt=ls.getItem("midifilters");
    if (flt) {
        let filtrs=JSON.parse(flt);
        console.log("JSON Filters",filtrs);
        for(let i in filtrs.types){
            $(":checkbox[value="+filtrs.types[i]+"]").prop("checked","true");
        }
        filters=filtrs;
    }

});