// Initialize player and register event handler
var Player = new MidiPlayer.Player(function(event) {
    //  console.log(event);
});

    // Load a MIDI file
console.log('Loading mid');
//Player.loadFile('./mid/chateaux.mid');
//Player.loadFile(song[2]);
Player.loadDataUri(song[2]);
//Player.loadFile('./mid/9to5.mid');//nope

if(Player.validate()){
    console.log("ok");
    console.log(Player.getFormat() );
    console.log(Player.getSongTime() );
    console.log(Player.getTotalEvents() );
}else{
    console.log("nope");
}

//Player.play();


/*
Player.on('fileLoaded', function() {
    // Do something when file is loaded
    console.log('loaded');
});

Player.on('playing', function(currentTick) {
    // Do something while player is playing
    // (this is repeatedly triggered within the play loop)
//  console.log('playing');
});
*/

Player.on('midiEvent', function(e) {
    // Do something when a MIDI event is fired.
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
     if(!portId()){
        console.error("no portid");
        return;
     }

    //console.log(e);//debug
    let output = MIDIoutput();

    switch(e.name){

        case "Note on":
            var b0=0x90+(e.channel-1);
            var msg = [b0,e.noteNumber,e.velocity];
            output.send( msg );
            break;

        case "Note off":
            var b0=0x80+(e.channel-1);
            //console.log(msg);
            var msg = [b0,e.noteNumber,e.velocity];
            output.send( msg );
            break;


        case "Controller Change":
            var b0=0xb0+(e.channel-1);
            //console.log([b0,e.number,e.value]);
            var msg = [b0, e.number, e.value];
            output.send( msg );
            break;

            case "Program Change":
            var b0=0xc0+(e.channel-1);
            var msg = [b0, e.value];
            output.send( msg );
            break;


        case 'Pitch Bend':
            console.log('pitch todo',e);
            //var b0=0xe0+(e.channel-1);
            break;


        case 'Text Event':
            console.log(e.string);
            break;

        default:
            console.log(e.name);
            break;
    }
    //output.sendMessage([176,22,1]);
});

Player.on('endOfFile', function() {
    // Do something when end of the file has been reached.
    console.log('end')
});