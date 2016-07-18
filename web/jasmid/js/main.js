//
// http://www.personal.kent.edu/~sbirch/Music_Production/MP-II/MIDI/midi_file_format.htm
// https://www.cs.cmu.edu/~music/cmsip/readings/Standard-MIDI-file-format-updated.pdf
// http://www.ccarh.org/courses/253/handout/vlv/

function loadRemote(path, callback) {
	

	//console.info('loadRemote()',path);
	
	var fetch = new XMLHttpRequest();
	fetch.open('GET', path);
	fetch.overrideMimeType("text/plain; charset=x-user-defined");
	fetch.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			/* munge response into a binary string */
			var t = this.responseText || "" ;
			var ff = [];
			var mx = t.length;
			var scc= String.fromCharCode;
			for (var z = 0; z < mx; z++) {
				ff[z] = scc(t.charCodeAt(z) & 255);
			}
			//console.log(ff);
			//console.log('ff.length',ff.length);
			callback(ff.join(""));
		}
	}
	fetch.send();
}

function play(file) {
	
	console.info('play()',file);

	loadRemote(file, function(data) {
		midiFile = MidiFile(data);
		//console.info(midiFile.reader,midiFile.tracks);
		//synth = Synth(44100);
		//replayer = Replayer(midiFile, synth);
		//audio = AudioPlayer(replayer);
		showTracks();
	})
}


function showTracks(){
	
	//console.info('showTracks()');

	console.log(midiFile.header);

	var htm="<table class='table table-condensed table-hover' style='cursor:pointer' id=tableTracks>";
	
	htm+="<thead>";
	htm+="<th>#</th>";
	htm+="<th>Length</th>";
	htm+="<th>Name</th>";
	htm+="</thead>";
	htm+="<tbody>";
	
	for(var i in midiFile.tracks){
		var track=midiFile.tracks[i];
		htm+='<tr data-track="'+i+'">';
		htm+="<td>"+i;
		htm+="<td>"+track.length;
		htm+="<td>"+track[0].subtype;
	}
	
	htm+="</tbody>";
	htm+="</table>";
	
	$('#boxTracks .box-body').html(htm);
	$('#tableTracks tbody>tr').click(function(e){
		showTrack(e.currentTarget.dataset.track);
	});
}

function showTrack(i){
	console.log('showTrack(i)',i);
	var htm="<table class='table table-condensed table-hover' style='cursor:pointer' id=tableTrack>";
	htm+="<thead>";
	htm+="<th>deltaTime</th>";
	htm+="<th>type</th>";
	htm+="<th>subtype</th>";
	htm+="<th>value</th>";
	htm+="</thead>";
	htm+="<tbody>";
	for(var j in midiFile.tracks[i]){	
		
		var o=midiFile.tracks[i][j];
		//console.log(o);
		htm+='<tr>';
		htm+="<td>"+o.deltaTime;
		htm+="<td>"+o.type;
		htm+="<td>"+o.subtype;
		if(o.b1)htm+="<td>"+o.b1;//byte 1
	}
	htm+="</tbody>";
	htm+="</table>";
	
	$('#boxTrack .box-body').html(htm);
	$('#tableTrack').tablesorter();
}