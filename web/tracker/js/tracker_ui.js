$(function(){
	
	var velocity=127;//default keyboard velocity
	var octave=1;
	var midiprg=0;
	
	tracker.init();

	refresh(0);
	//printPhrase(0);
	randomize();
});



/**
 * Display hex value
 * '--'' if 255
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function hexv(n){
	if(n==undefined)n='??';
	else if(n>=256)n='??';
	else if(n==255)n='--';
	var x=n.toString(16);
	if(n<16)x='0'+x;
	return x.toUpperCase();
}

function nToNote(n){
	if(n>=256)n='???';
	if(n==255)return '---';
	var notes=['C-','C#','D-','D#','E-','F-','F#','G-','G#','A-','A#','B-'];
	var k=n%12;
	var o=Math.floor(n/12);
	return notes[k]+o;
}


function printSong(){
	
	var d=tracker.tracks();
	if(!d)return;
	
	console.info('printSong()',d);
	
	var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';
	
	htm+="<thead>";
	htm+="<th width=30>#</th>";
	
	htm+="<th>A</th>";
	htm+="<th>B</th>";
	htm+="<th>C</th>";
	htm+="<th>D</th>";
	
	htm+="</thead>";
	htm+="<tbody>";
	
	for(var i=0;i<16;i++){
		var r=tracker.song(i);

		htm+='<tr data-i='+i+'>';
		htm+='<td><i class="text-muted">'+i.toString(16).toUpperCase();
		for(j=0;j<tracker.tracks().length;j++){
			htm+='<td data-chain='+r[j]+'>';
			htm+=hexv(r[j]);	
		}
	}
	
	//htm.push("SONG - "+nav.songxy[0]+'x'+nav.songxy[1]+"<br />");
	$('div#boxSong .box-body').html(htm);
	$("#boxSong tbody>tr>td").click(function(e){
		console.log("song td.click",e.currentTarget.dataset.chain);
	});
}


function printChain(n){
	
	var d=tracker.chain(n);
	
	if(!d){
		//console.warn("Chain #"+n+" not found");
		return "Chain 0x"+hexv(n)+" not found";	
	}
	
	//console.log('printChain()',d)
	var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';
	htm+='<thead>';
	htm+='<th width=30>#</th>';
	htm+='<th style="text-align:center">Phrase</th>';
	htm+='<th style="text-align:center">Trn</th>';
	htm+='</thead>';
	htm+='<tbody>';
	for(var i=0;i<16;i++){
		htm+='<tr data-i='+i+'>';
		htm+='<td width=30><i class="text-muted">'+i.toString(16).toUpperCase();
		
		htm+='<td data-phrase='+d[i][0]+' style="text-align:center">'+hexv(d[i][0]);//phrase
		htm+='<td data-transp='+d[i][1]+' style="text-align:center">';
		if(d[i][1]!=0){
			htm+=hexv(d[i][1]);//transpose	
		}else{
			htm+='<i class="text-muted">--</i>';
		}
		
		//htm.push(row.join(' '));
	}

	$('#boxChain .box-title').html("CHAIN 0x"+hexv(n));
	$('#boxChain .box-body').html(htm);
	$('#boxChain tbody>tr>td').click(function(e){
		console.log("chain td.click",e.currentTarget.dataset.phrase);
		printPhrase(e.currentTarget.dataset.phrase);
	});
	return true;
}


function printPhrase(n){
	
	console.info('printPhrase(n)',n);
	
	var d=tracker.phrase(n);
	
	if (n<0) {//glitch in the matrix
		console.warn('printPhrase(n)',n);
		return;
	}
	
	
	var htm='<table class="table table-hover table-condensed" style="display:cursor">';
	htm+='<thead>';
	htm+='<th>#</th>';
	htm+='<th>Note</th>';
	htm+='<th>CC</th>';
	htm+='<th>CC</th>';
	htm+='</thead>';
	htm+='<tbody>';
	
	for(var i=0;i<16;i++){
		
		htm+='<tr>';
		htm+='<td><i class="text-muted">'+i.toString(16).toUpperCase();
		
		for(var j=0;j<8;j++){
			htm+='<td>';
			if(j==0){
				htm+=nToNote(d[i][0]);
			}else{
				htm+=hexv(d[i][j]);
			}	
		}			
		
	}

	htm+='</tbody>';
	htm+='</table>';
	
	$("#boxPhrase .box-title").html("PHRASE 0x"+hexv(n));
	$("#boxPhrase .box-body").html(htm);
	$("#boxPhrase tbody>td").click(function(){
		console.log("td.click");
	});
	
	/*
	htm.push("<br />");
	return htm.join(' ');
	*/
}



function randomize(){
	
	console.info('randomize()');
	
	//randomize song
	for(var i=0;i<4;i++){
		tracker.song(i)[0]=rnd(32);
		tracker.song(i)[1]=0;
		//tracker.song(i)[2]=0;
		//tracker.song(i)[3]=0;
	}
	
	//randomize chains
	for(var i=0;i<64;i++){
		for(var j=0;j<4;j++){
			tracker.chain(i)[j][0]=rnd(16);
			//tracker.chain(i)[j][0]=rnd(16);
		}
	}


	//randomize phrases 0
	for(var p=0;p<32;p++){
		for(var i=0;i<16;i++){
			tracker.phrase(p)[i][0]=rnd(64)+32;
		}	
	}
	
	
	refresh(0);
}

var lastn;
function refresh(n){
	console.info('refresh(n)',n);
	if(n==undefined)n=lastn;
	printSong();
	printChain(n);
	printPhrase(n);
	if(n!=undefined)lastn=n;
}

function rnd(n){
	return Math.round(Math.random()*n);
}