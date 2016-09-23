
console.info("canvas.js");


var canvasElement = document.getElementById('screen');
var ctx = canvasElement.getContext('2d');

ctx.font = '8px C64ProMonoRegular';
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;


function updateTracks(){// update the tracks selector
	
	console.info('updateTracks()');
	
	$('#trackSelect').find('option').remove();
	var x = document.getElementById("trackSelect");

	for(var i in _midiTracks){
		
		var nfo=_midiTracks[i];
		
		if(nfo.notes<1)continue;
		
		console.info(i,nfo);
		
		var option = document.createElement("option");
		option.value = i;
		option.text = "#" + i + " - " + nfo.trackName;
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

	var track=midiFile.tracks[trackNumber];// count tracks
	
	//console.log('track.length',track.length);
	
	var cell_height=12;
	var beat_width=40;
	
	var tifo=_midiTracks[trackNumber];

	if (tifo.note_diff>1) {
		
		canvasElement.height=tifo.note_diff*cell_height;	// resize height
	}
	

	// draw something //
	//ctx.fillStyle = '#eee';
    //ctx.fillRect(0, 0, 1024, 200);// paint all, at cpu cost!
    
    
    
    //draw lines
    ctx.fillStyle = '#cccccc';
    ctx.lineWidth=0.5;
    for(var i=0;i<tifo.note_diff;i++){
		
		//ctx.fillStyle = txtcol;
		ctx.fillText('#'+i, 0, i*cell_height+0.5);

		ctx.beginPath();
		ctx.moveTo(0,i*cell_height+0.5);
		ctx.lineTo(800,i*cell_height+0.5);
		ctx.stroke();
    }

    /*
    for(var i in tracks){
      //var v=audioArray[i];
      //ctx.fillRect(i, 200-v, i, v);// paint all, at cpu cost!  
    }
	*/


}

