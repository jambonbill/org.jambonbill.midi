//
// http://www.personal.kent.edu/~sbirch/Music_Production/MP-II/MIDI/midi_file_format.htm
// https://www.cs.cmu.edu/~music/cmsip/readings/Standard-MIDI-file-format-updated.pdf
// http://www.ccarh.org/courses/253/handout/vlv/

var _track=0;//current track
var filters=[];
var midiFile={};
var audio={};

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
	var _files=[];
	$('#btnBrowse').click(function(){
		
		//get files//
		$.post('ctrl.php',{'do':'browse'},function(json){
			//console.log(json);
			_files=json.files;
			fileList();
		}).error(function(e){
			console.warn(e.responseText);
		});
		
		//build table
		function fileList(){
			var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';
			htm+='<thead>';
			htm+='<th>Filename</th>';
			htm+='</thead>';
			htm+='<tbody>';
			for(var i in _files){
				htm+='<tr title="'+_files[i]+'">';
				htm+='<td>'+_files[i];
			}
			htm+='</tbody>';
			htm+='</table>';
			
			$('#myModal').modal('show');//pop
			$('#myModal .modal-body').html(htm);
			$('#myModal tbody>tr').click(function(e){
				console.log(e.currentTarget.title);
				play("mid/"+e.currentTarget.title);
				$('#myModal').modal('hide');//pop
			});
		}
		
	});
	
	$('#btnPlay').click(function(){
		if(!midiFile){
			return;
		}
		synth = Synth(44100);
		replayer = Replayer(midiFile, synth);
		audio = AudioPlayer(replayer);
	});

	$('#btnStop').click(function(){
		audio.stop();
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

	function trackInfo(track){
		
		var trackName='';
		var channels={};
		
		for(var i in track){
			if(track[i].subtype=='noteOn'){
				channels[track[i]]=true;
			}
			if(track[i].subtype=='trackName'){
				trackName=track[i].text;
				//return track[i].text;
			}
		}
		return {
			'trackName':trackName,
			'channel':channels
		};
	}

	//console.log(midiFile.header);

	var htm="<table class='table table-condensed table-hover' style='cursor:pointer' id=tableTracks>";
	
	htm+="<thead>";
	htm+="<th>#</th>";
	htm+="<th>Track name</th>";
	htm+="<th>Channel</th>";
	htm+="<th style='text-align:right'>Length</th>";
	htm+="</thead>";
	htm+="<tbody>";
	
	for(var i in midiFile.tracks){
		var track=midiFile.tracks[i];
		var nfo=trackInfo(track);
		htm+='<tr data-track="'+i+'">';
		htm+="<td>"+i;
		htm+="<td>"+nfo.trackName;
		htm+="<td>"+nfo.channels;
		htm+="<td style='text-align:right'>"+track.length;
	}
	
	htm+="</tbody>";
	htm+="<tfoot>";
	htm+="<tr>";
	htm+="<td>";
	htm+="<td><b>"+midiFile.tracks.length+" track(s)</b>";
	htm+="<td>";
	htm+="</tfoot>";
	htm+="</table>";
	
	$('#boxTracks .box-title').html(midiFile.tracks.length+" tracks <small>"+midiFile.header.ticksPerBeat+" ticks per beat</small>");
	$('#boxTracks .box-body').html(htm);
	
	$('#tableTracks tbody>tr').click(function(e){
		_track=e.currentTarget.dataset.track;
		showTrack();
	});
}


function showTrack(){
	
	var i=_track;
	var deltaCumul=0;
	console.log('showTrack(i)',i);
	
	var htm="<table class='table table-condensed table-hover' style='cursor:pointer' id=tableTrack>";
	htm+="<thead>";
	
	htm+="<th>Type</th>";
	htm+="<th>Subtype</th>";
	htm+="<th>Value</th>";
	htm+="<th>Delta</th>";
	htm+="<th>Cumul</th>";
	htm+="<th>Beat</th>";
	htm+="</thead>";
	htm+="<tbody>";
	
	for(var j in midiFile.tracks[i]){	
		
		var o=midiFile.tracks[i][j];
		
		deltaCumul+=o.deltaTime;

		//filter
		if(o.type=='sysEx')continue;
		if(o.subtype=='noteOff')continue;
		if(o.subtype=='controller')continue;
		if(o.subtype=='programChange')continue;
		if(o.subtype=='pitchBend')continue;
		

		//console.log(o);
		
		htm+='<tr>';
		
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

		htm+="<td style='text-align:right'>"+o.deltaTime;
		htm+="<td style='text-align:right'>"+deltaCumul;
		var beat=Math.floor(deltaCumul/midiFile.header.ticksPerBeat);
		htm+="<td style='text-align:right'>"+beat;
	}
	
	htm+="</tbody>";
	htm+="<tfoot>";
	htm+="<tr>";
	htm+="<td>";
	htm+="<td>";
	htm+="<td style='text-align:right'>"+Math.round(deltaCumul/midiFile.header.ticksPerBeat)+"beats";
	htm+="<td style='text-align:right'>"+deltaCumul;
	
	htm+="</tfoot>";
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