
console.info("canvas.js");


var canvasElement = document.getElementById('screen');
var ctx = canvasElement.getContext('2d');

ctx.font = '8px C64ProMonoRegular';
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;


function updateTracks(){// update the tracks selector
	console.info('updateTracks()');
	$('#trackSelect').find('option').remove();
	for(var i in midiFile.tracks){
		var x = document.getElementById("trackSelect");
		var option = document.createElement("option");
		option.value = i;
		option.text = "Track #"+i;
		x.add(option);
	}

	$('#trackSelect').change(function(){
		drawMidiTrack($('#trackSelect').val());
	});
	drawMidiTrack(0);
}

function resizeCanvas(){
	var w=$('#boxCanvas .box-body').width();
	canvasElement.width=w;
	canvasElement.height=200;
}

function drawMidiTrack(trackNumber)
{
	
	console.info('drawMidiTrack('+trackNumber+')');
	
	if(!midiFile||!midiFile.tracks){
		console.warn('nothing to draw');
		return;
	}
	
	resizeCanvas();

	//count tracks
	var track=midiFile.tracks[trackNumber];
	
	console.log('track.length',track.length);
	
	
	
	console.info(trackInfo(track));

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

