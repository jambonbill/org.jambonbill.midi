//
// http://www.personal.kent.edu/~sbirch/Music_Production/MP-II/MIDI/midi_file_format.htm
// https://www.cs.cmu.edu/~music/cmsip/readings/Standard-MIDI-file-format-updated.pdf
// http://www.ccarh.org/courses/253/handout/vlv/

var _track=0;//current track
var filters=[];

$(function(){
	
	$('input.filters').click(function(){
        //console.log('btnFilter');
        filters=[];
        $('input.filters').each(function(i,e){
          if(e.checked)filters.push(+e.value);
          //console.log(i,e.value,e.checked);
        });
        console.log(filters);
        showTrack();
    });

});


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
		
		
		showTracks();
		//replay();
	})
}

function replay(){
	console.log('replay()');
	synth = Synth(44100);
	replayer = Replayer(midiFile, synth);
	audio = AudioPlayer(replayer);
}


function showTracks(){
	
	//console.info('showTracks()');

	function trackName(track){
		for(var i in track){
			if(track[i].subtype=='trackName'){
				return track[i].text;
			}
		}
		return "?";
	}

	//console.log(midiFile.header);

	var htm="<table class='table table-condensed table-hover' style='cursor:pointer' id=tableTracks>";
	
	htm+="<thead>";
	htm+="<th>#</th>";
	htm+="<th>Track name</th>";
	htm+="<th>Length</th>";
	htm+="</thead>";
	htm+="<tbody>";
	
	for(var i in midiFile.tracks){
		var track=midiFile.tracks[i];
		htm+='<tr data-track="'+i+'">';
		htm+="<td>"+i;
		htm+="<td>"+trackName(track);//track[0].subtype;
		htm+="<td style='text-align:right'>"+track.length;
	}
	
	htm+="</tbody>";
	htm+="</table>";
	
	$('#boxTracks .box-body').html(htm);
	$('#tableTracks tbody>tr').click(function(e){
		_track=e.currentTarget.dataset.track;
		showTrack();
	});
}


function showTrack(){
	
	var i=_track;
	
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
		
		
		//filter
		if(o.type=='sysEx')continue;
		//if(o.subtype=='noteOff')continue;
		if(o.subtype=='controller')continue;
		if(o.subtype=='programChange')continue;
		if(o.subtype=='pitchBend')continue;
		

		//console.log(o);
		
		htm+='<tr>';
		htm+="<td>"+o.deltaTime;
		htm+="<td>"+o.type;
		if(o.type=='channel')htm+=' '+(o.channel+1);

		htm+="<td>"+o.subtype;
		if (o.subtype=='noteOn'||o.subtype=='noteOff') {
			htm+="<td>"+mn2str(o.b1);//byte 1
		} else if(o.b1) {
			htm+="<td>"+o.b1;//byte 1
		} else if(o.text) {
			htm+="<td>"+o.text;//text
		}
	}
	htm+="</tbody>";
	htm+="</table>";
	
	$('#boxTrack .box-title').html("track #"+_track);
	$('#boxTrack .box-body').html(htm);
	$('#tableTrack').tablesorter();
}


function mn2str(n){
	var oct=Math.floor(n/12);
	var _notestr=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
	return _notestr[n%12]+oct;
}