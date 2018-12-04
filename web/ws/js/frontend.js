//https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61
$(function () {
    
    "use strict";

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    
    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        console.error('Sorry, but your browser doesn\'t support WebSocket.');
        return;
    }
    
    // open connection
    let host='127.0.0.1';
    let port=1337;
    let url='ws://'+host+':'+port;
    let connection=null;

    connect(url);//go
    
    function connect(url){
        
        console.log("Connect to "+url);
        
        connection = new WebSocket(url);
        connection.binaryType = "arraybuffer";

        connection.onopen = function () {
            console.log("Connection is open");
        };
        
        connection.onerror = function (error) {
            console.error('connection.onerror');
        };

        connection.onmessage = function (message) {
            
            let event={};//simulate midi vocabulary, so we can forward to MIDIMessageEventHandler
            event.data = new Uint8Array(message.data);
            console.log(event.data);
        };
    }

   
    // most important part - incoming messages
    /*
    connection.onmessage = function (message) {
        
        let event={};//simulate midi vocabulary, so we can forward to MIDIMessageEventHandler
            event.data = new Uint8Array(message.data);
        
        console.log(event.data, event.data.length);

        var msg=event.data[0] & 0xf0;
        var midichannel=event.data[0] & 0x0f;

        // Mask off the lower nibble (MIDI channel)
        switch (event.data[0] & 0xf0) {
            
            case 0x80://note off
                console.log('note off', event.data[1]);
                break;

            case 0x90://note on
                console.log("note on",event.data[1], event.data[2]);
                break;

            case 0xB0:// CC - Control Change
                var ccNum=event.data[1];
                console.log("CC#"+event.data[1], event.data[2]);
                break;
            
            case 0xC0:// Prg Change
                console.log('Prg Change', event.data[1]);        
                break;

            case 0xE0://pitch
                break;
            
            case 0xF0:// Other (time)
                break;

        }
    };
    
    */
  

    window.noteOn=function(midiChannel, note,velocity){
        if(typeof(note)!='number')return false;
        if(typeof(velocity)!='number')return false;
        //connection.send({midi:[0x90+midiChannel, note, velocity]});// note on, notenum, velocity
        let msg=new Uint8Array(3);
        msg[0]=0x90+midiChannel;
        msg[1]=note;
        msg[2]=velocity;
        connection.send(msg);
        return true;
    }
    
    window.noteOff=function(midiChannel, note){
        if(typeof(midiChannel)!='number')return false;
        if(typeof(note)!='number')return false;
        //connection.send([0x80+midiChannel, note, 0x00]);// note on, notenum, no velocity 
        let msg=new Uint8Array(3);
        msg[0]=0x80+midiChannel;
        msg[1]=note;
        msg[2]=0x00;
        connection.send(msg);
        return true;
    }
    
    window.prgChange=function(midiChannel,value){
        if(typeof(midiChannel)!='number')return false;
        if(typeof(value)!='number')return false;
        let msg=new Uint8Array(2);
        msg[0]=0xC0+midiChannel;
        msg[1]=value;
        //msg[2]=0x00;
        connection.send(msg);
        return true;
    }

    window.cChange=function(midiChannel,ccNumber,value){
        if(typeof(midiChannel)!='number')return false;
        if(typeof(ccNumber)!='number')return false;
        if(typeof(value)!='number')return false;
        let msg=new Uint8Array(3);
        msg[0]=0xB0+midiChannel;
        msg[1]=ccNumber;
        msg[2]=value;
        connection.send( msg );
        return true;
    }

});