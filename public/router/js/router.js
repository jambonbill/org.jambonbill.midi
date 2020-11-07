$(()=>{

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

        listInputs();
        listOutputs();

        function listInputs(){
            _midiInputs=[];
            let inputs=midi.inputs.values();
            for ( let input = inputs.next(); input && !input.done; input = inputs.next()) {
                //console.log(input.value);
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
            if(!_midiReady)return false;
            let p=d.port;
            console.info(p.type, p.name, p.connection);
            //console.log("onstatechange d",d.port);
            listInputs();
            listOutputs();
            displayInputs();
            displayOutputs();
        };

        _midiReady=true;
        console.info('MIDI ready');
        displayInputs();
        displayOutputs();

        $('.overlay').hide();

    }

    function onMIDIReject(err) {
        console.error("MIDI system failed to start.");
    }


    function displayInputs(){
        //console.info('displayInputs()');
        let htm='<table class="table table-sm table-hover" style="cursor:pointer">';
        htm+='<thead>';
        htm+='<th>#</th>';
        htm+='<th>input</th>';
        //htm+='<th>Manufacturer</th>';
        htm+='<th></th>';
        htm+='</thead>';

        htm+='<tbody>';
        var ins=_midiInputs;
        for(let i in ins){
            var o=ins[i];
            //console.log(o);
            htm+='<tr title="'+o.id+'">';
            htm+='<td><i class="text-muted">'+i;
            htm+='<td>'+o.name;
            htm+=' <i class="text-muted">'+o.manufacturer+'</i>';
            htm+='<td style="text-align:right"><i class="text-muted">'+o.state;
        }
        htm+='</tbody>';

        if(ins.length==0){
            htm='<pre>none</pre>';
        }

        $('div#sources').html(htm);
        $('div#sources tbody>tr').click(function(){
            $('div#sources tbody>tr').removeClass("bg-primary");
            $(this).addClass("bg-primary");
        });
        //$('#boxInputs .overlay').hide();
    }

    function displayOutputs(){
        //console.info('displayOutputs()');
        let htm='<table class="table table-sm table-hover" style="cursor:pointer">';
        htm+='<thead>';
        htm+='<th>#</th>';
        htm+='<th>output</th>';
        //htm+='<th>Manufacturer</th>';
        htm+='<th></th>';
        htm+='</thead>';

        htm+='<tbody>';

        for(let i in _midiOutputs){
            let o=_midiOutputs[i];
            //console.log(o);
            htm+='<tr title="'+o.id+'">';
            htm+='<td><i class="text-muted">'+i;
            htm+='<td>'+o.name;
            htm+=' <i class="text-muted">'+o.manufacturer+'</i>';
            htm+='<td style="text-align:right"><i class="text-muted">'+o.state;
        }
        htm+='</tbody>';
        if(_midiOutputs.length==0){
            htm='<pre>none</pre>';
        }
        $('div#destinations').html(htm);
        $('div#destinations tbody>tr').click(function(){
            $('div#destinations tbody>tr').removeClass("bg-primary");
            $(this).addClass("bg-primary");
        });
        //$('#boxOutputs table').tablesorter();
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