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
    
    var continues=0;//bpm counter
    var filters=[];
    var logs=[];
    
    $.onMIDIInit=function(midi) {                    
        console.info('onMIDIInit');
        midiAccess = midi;
        
        $.MIDIMessageEventHandler=function(event){
            
            var msg=event.data[0];
            var midichannel=event.data[0] & 0x0f;
            var type=msg & 0xf0;
            if(type==0xf0){
                continues++;
                return;
            }
            console.info('$.MIDIMessageEventHandler(event)',event);
            logs.push({'t':new Date(),'msg':msg,'e':event});
            dispLog();//
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
        
        

        $('.overlay').hide();
    }
    /*
    $.MIDIMessageEventHandler(event) {
        //var msg=event.data[0] & 0xf0;
        console.info('$.MIDIMessageEventHandler(event)');
        var msg=event.data[0];
        var midichannel=event.data[0] & 0x0f;
        var type=msg & 0xf0;
        if(type==0xf0){
            continues++;
        }

        
        for(i in filters){// Filter here
            if(type==filters[i])return;
        }
        
        //logs.push({'t':new Date(),'msg':msg,'chn':midichannel,'b1':event.data[1],'b2':event.data[2]});
        logs.push({'t':new Date(),'msg':msg,'e':event});
        dispLog();//
    }
    */
    
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
        
        var htm='<table class="table table-hover table-condensed">';
        
        htm+='<thead>';
        htm+='<th width=100>Time</th>';
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
        
        $('#boxIncoming .box-body').html(htm);
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

    $('#btnRecord').click(function(){
        console.log('btnRecord');

    });

    
});
