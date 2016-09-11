
console.info("canvas.js");


var canvasElement = document.getElementById('screen');
var ctx = canvasElement.getContext('2d');

ctx.font = '8px C64ProMonoRegular';
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;


function drawMidiTrack(trackNumber)
{
	
	console.info('drawMidiTrack(trackNumber)',trackNumber);
	
	if(!midiFile||!midiFile.tracks)return;
	
	//count tracks
	var track=midiFile.tracks[trackNumber];
	console.log('track.length',track.length);
	
	//count notes, get stats


	// draw something //
	ctx.fillStyle = '#999999';
    ctx.fillRect(0, 0, 1024, 200);// paint all, at cpu cost!
    
    ctx.fillStyle = '#333333';
    /*
    for(var i in tracks){
      //var v=audioArray[i];
      //ctx.fillRect(i, 200-v, i, v);// paint all, at cpu cost!  
    }
	*/


}

