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

$(function(){

    let _midiAccess=null;  // the MIDIAccess object.
    let _midiChannel=0;
    let _midiInputs;
    let _midiOutputs;
    let _midiReady=false;

    var continues=0;//bpm counter
    var filters=[];
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


        /*
        _midiOutputs=[];
        for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
            console.log(output);
            _midiOutputs.push(output.value);
        }
        */

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

        if(type==0xf0){
            continues++;
        }

        // Filter here
        for(i in filters){
            if(type==filters[i])return;
        }

        //console.log(event);

        //logs.push({'t':new Date(),'msg':msg,'chn':midichannel,'b1':event.data[1],'b2':event.data[2]});
        logs.push({'t':new Date(),'msg':msg,'e':event});

        dispLog();
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


    function msgType(msg){
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
                return   msgtypes[msg] + " <i class='text-muted'>C-0</i>";
            case 0xb0:
                return   msgtypes[msg] + " <i class='text-muted'>#0</i>";
        }
        return msgtypes[msg];
    }

    function dispLog(){
        if(logs.length>20)logs.shift();

        let htm='<table class="table table-hover table-sm">';

        htm+='<thead>';
        htm+='<th width=130>Time</th>';
        htm+='<th>Type</th>';
        htm+='<th width=50>Msg</th>';
        htm+='<th width=50>Chn</th>';
        htm+='<th width=50>B1</th>';
        htm+='<th width=50>B2</th>';
        htm+='</thead>';

        htm+='<tbody>';
        for(var i=0;i<logs.length;i++){
          var d=logs[i].t;
          var msg=logs[i].e.data[0];
          var midichannel=msg & 0x0f;
          htm+='<tr>';
          htm+='<td>'+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"-"+d.getMilliseconds();

          //var msgtype=table-condensed

          htm+='<td>'+msgType(msg);
          htm+='<td>0x'+msg.toString(16);

          htm+='<td>'+(midichannel+1);
          htm+='<td>';
          if(logs[i].e.data[1])htm+=logs[i].e.data[1];

          htm+='<td>';
          if(logs[i].e.data[2])htm+=logs[i].e.data[2];
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
        filters=[];
        $('input.filters').each(function(i,e){
          if(e.checked)filters.push(+e.value);
          //console.log(i,e.value,e.checked);
        });
        console.log(filters);
    });

    /*
    $('#btnRecord').click(function(){
        console.log('btnRecord');
    });
    */

});