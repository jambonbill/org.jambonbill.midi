// jambonbill cc.js
$(function(){

    'use strict';

    var config={
        'name':'new',
        'comment':'',
        'midiInput':'',
        'midiOutput':'',
        'midichannel':'',
        'widgets':[]
    };
    
    var _discover=false;
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
                
                case 0x80://note off
                    $('footer.main-footer').html("Incoming Note off "+a + " Velo:"+b);
                    break;

                case 0x90://note on
                    $('footer.main-footer').html("Incoming Note on "+a + " Val:"+b);
                    break;

                case 0xb0:    //CC
                    console.log("CC#"+a, "Chan#"+(midichannel+1), b);
                    $('footer.main-footer').html("Incoming CC#"+a + " Val:"+b);
                    $("input[data-cc='"+a+"']").val(b);
                    autoDiscover(a);
                    break;

                case 0xc0://'Program change'
                    $('footer.main-footer').html("Incoming Prg change #"+a);
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
		/*
        for(var i in ins){
			var a=ins[i];
			var s=document.getElementById("midiInput");
		    var o=document.createElement("option");
		    o.value=a.id;
		    o.text=a.name;
		    s.add(o);
		}
        */
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

    // Send control change
    // http://www.blitter.com/~russtopia/MIDI/~jglatt/tech/midispec/ctllist.htm
    var sendMidiCC=function(chan,ccNumber,value)
    {

        if(chan<0||chan>16){
            return false;
        }

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

    //http://www.blitter.com/~russtopia/MIDI/~jglatt/tech/midispec/pgm.htm
    var sendPrgChange=function(value)
    {
        console.log('sendPrgChange=function(value)',value);
        var chan=+$('select#midiChannel').val();
        var portId=$('select#midiOutput').val();
        var output=midiAccess.outputs.get(portId);
        if(!output){
            console.error('!output');
            return false;
        }
        output.send( [0xC0+chan, value] );
        return true;
    }

    $('select#midiOutput').change(function(){
        config.midiOutput=$('select#midiOutput').val();
    });

    $.getConf=function(){
        return config;
    }

    


    


    // Keyboard //
    var _octave=2;
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


    function autoDiscover(ccnum){
        
        var found=false;
        
        for(var i in config.widgets){
            var o=config.widgets[i];
            if (o.cc==ccnum) {
                found=true;    
            }
        }
        
        if (!found) {
            console.log("this is new: CC#"+ccnum);
            config.widgets.push(itemCC("CC#", ccnum));
            makeItReal();    
        }
        
    }


    function addWidget(){
        config.widgets.push(itemCC("New widget", 0));
    }


    $('a#btnAdd').click(function(){        
        console.info('btnAdd');
        config.widgets.push(itemCC("New widget", 0));
        makeItReal();
        popEdit(config.widgets.length-1);
    });


    $('a#btnClearAll').click(function(){
        clearAll();        
    });

    $('a#btnPrgChange').click(function(){
        var p=prompt("Enter PRG num",1);
        if(!p)return;
        sendPrgChange(p);
    });

    

    $('a#btnLoadConf').click(function(){
        console.info('a#btnLoadConf');
        $('#modalConfigs').modal('show');
    });

    $('#modalConfigs tbody>tr').click(function(e){
        loadConfig(e.currentTarget.dataset.filename);
    });


    function loadConfig(fn){
        console.info('loadConfig(fn)');
        $.post('ctrl.php',{'do':'getConfig','filename':fn},function(json){
            console.log(json);
            if (json.error) {
                console.error(json.error);
                alert(json.error);
            }
            if (json.config) {
                config=json.config;
                $('#modalConfigs').modal('hide');
                makeItReal();
            }
        }).error(function(e){
            console.error(e.responseText);
        });
    }


    $('a#btnSaveConf').click(function(){
        console.info('a#btnSaveConf');

        var filename=config.name+".json";
        filename=prompt("Download as (enter filename)", filename);
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


    $('#btnUpdate').click(function(){
        var i=$('#wnum').val();
        var W=config.widgets[i];
        console.log('#btnUpdate',i,W);
        $('#modalWidget').modal('hide');
        W.type=$('select#wtype').val();
        W.name=$('input#ccname').val().replace(/</g, "&lt;");
        W.cc=$('input#cc').val();
        W.value=$('input#ccvalue').val();
        //W.channel=1;
        W.comment=$('input#cccomment').val();
        W.color=$('select#colorselector').val();
        makeItReal();
    });



    $('#btnDelete').click(function(){
        console.log('#btnDelete');
        var i=$('#wnum').val();
        if(!confirm("Delete this widget #"+i+" ?"))return;
        var NW=[];
        for(var j in config.widgets){
            var w=config.widgets[j]
            if(j!=i){
                NW.push(w);
            }
        }
        config.widgets=NW;
        $('#modalWidget').modal('hide');
        makeItReal();
    });

    $('input#configName').keyup(function(){
        config.name=$('input#configName').val();
        $('h1').html(config.name);
    });

    $('#modalWidget').on('shown.bs.modal',function(){
        $('input#ccname').focus();
    });

    //var cclib=[];//list of widgets/cc binding

    function itemCC(type,n){
    	console.log('itemCC(type,n)',type,n)
        return {
    		'type':type,
    		'name':type+' #'+n,
    		'cc':+n,
            'value':0,
            'max':127,
            'channel':0,
            'options':[],
            'color':'#EEEEEE',
    		'comment':'',
    	}
    }

    function clearAll(){
        console.info('clearAll()');
        //cclib=[];
        config.name='New';
        config.widgets=[];
        makeItReal();
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


        $('h1').html(config.name + " <small>midi output</small>");
        $('#boxSetup .box-title').html(config.name + " <small>midi output</small>");
        $('input#configName').val(config.name);

        if (config.midichannel>0) {
            $('select#midiChannel').val(config.midichannel);
        }

        $('div#ccboxes').html('');//
        for(var i in config.widgets){
    		var o=config.widgets[i];
    		//console.log(o);
            var htm='<div class="col-sm-3 col-lg-2 connectedSortable ui-sortable">';
            htm+=whtml(i);
            htm+='</div>';
            $('div#ccboxes').append(htm);
    	}
        
        // bind events //
        $('input[type=range]').change(function(e){
            console.log('value',e.currentTarget.value);
            var W=config.widgets[e.currentTarget.dataset.i];
            W.value=e.currentTarget.value;
            $(this).prev().html(e.currentTarget.value);
            var chan=+$('select#midiChannel').val();
            //console.warn("chan="+chan);
            sendMidiCC(chan,W.cc,W.value);
        });


        $('button.btn-edit').click(function(e){
            var i=e.currentTarget.dataset.i;
            /*
            var name=prompt("Widget name", W.name);
            if(name){
                W.name=name;
                makeItReal();
            }
            */
            popEdit(i)
            
        });
    }

    
    function popEdit(i){
    
        if(i==undefined){
            console.error("popedit() i is undefined");
            return false;
        }
    
        if(!config.widgets[i]){
            console.error('widget #'+i+" not found");
            return false;
        }
    
        var W=config.widgets[i];
        //console.warn('popEdit('+i+')',W);
        $('#modalWidget .modal-title').html(W.name);
        $('select#wtype').val(W.type);
        $('input#wnum').val(i);
        $('input#ccname').val(W.name);
        $('input#ccnumber').val(W.cc);
        $('input#ccvalue').val(W.value);
        $('input#ccmax').val(W.max);
        $('input#cccomment').val(W.comment);
        $('#modalWidget').modal('show');
    }

    
    function whtml(i){

        if(!config.widgets[i]){
            console.error("config.widgets["+i+"]");
            return;
        }
        
        var o=config.widgets[i];
        var name=o.name;
        var type=o.type;
        var cc=o.cc;
        var value=o.value;
        if(!value)value=0;
        var max=127;
        if(o.max>0&&o.max<127)max=o.max;
        var channel=0;
        
        if(!name)name="CC#"+cc;
        if(cc==NaN){
            console.error(o);
            return;
        }

        var style='';
        if (o.color) {
            style='style="border:solid '+o.color+'"';
        }

        var htm='<div class="box box-solid" '+style+'>';
        htm+='<div class="box-header ui-sortable-handle" style="cursor: move">';
        htm+='<h3 class="box-title" title="CC#'+cc+'"><i class="fa fa-text"></i> '+name+'</h3>';
        htm+='<div class="pull-right box-tools">';
        htm+='<button class="btn btn-box-tool btn-edit" title="Edit" data-i='+i+' data-num='+cc+'><i class="fa fa-edit"></i></button>';
        htm+='<button class="btn btn-box-tool btn-remove" title="Delete"><i class="fa fa-times"></i></button>';
        htm+='</div>';

        htm+='</div>';
        htm+='<div class="box-body" style="">';
        htm+='<div class="row">';
            htm+='<div class="col-sm-12">';
            htm+='<label>'+value+'</label>';
            switch(type){
                case 'button':
                    htm+='<button class="btn btn-lg btn-default">CC#x Value='+value+'</button></div>';
                    break;
                default:
                    htm+='<input type="range" data-cc='+cc+' data-i='+i+' value='+value+' max='+max+'>';
                    break;
            }
            
            
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
    $('#colorselector').colorselector();
});