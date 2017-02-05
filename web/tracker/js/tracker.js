var tracker = (function() {
	
	"use strict";//do this !
	
	var version=1;
	var track_number=12;

    var tracks=[];//hold track info
	var song=[];//hold song info
	var chains=[];
	var phrases=[];
	


	/**
	 * Return current interface as a string
	 * @return {[type]} [description]
	 */
	function toString()
	{
		var str='';
		return str;
	}


	var track=function(n){
		return tracks[n];
	}
	
	var tracks=function(){
		return tracks;
	}
	
	
	var newTrack=function(){//init track
		return {
			'chn':0,//midi channel
			'vel':0,//velocity
			'cc1':0,
			'cc2':0,
			'pos0':0,//main
			'pos1':0,//chain
			'pos2':0//phrase
		};
	}
	

	var songrow=function(n){return song[n];}
	
	var newSongRow=function(){
		var r=new Uint8Array(track_number);
		for(var i=0;i<r.length;i++)r[i]=255;
		//r=[255,255,255,255,255,255,255,255];
		return r;
	}
	

	/**
	 * return chain n
	 * @param  {[type]} n [description]
	 * @return {[type]}   [description]
	 */
	var chain=function(n){
		return chains[n];
	}
	

	var emptyChain=function(){
		var c=new Array(16);
		for(var i=0;i<c.length;i++){
			c[i]=new Uint8Array(2);
			c[i]=[255,0];
		}
		return c;
	}

	
	/**
	 * Return phrase n
	 * @param  {[type]} n [description]
	 * @return {[type]}   [description]
	 */
	var phrase=function(n){
		return phrases[n];
	}
	
	
	var newPhrase=function(){
		var p=new Array(16);
		for(var i=0;i<p.length;i++){
			p[i]=newStep();
		}
		return p;
	}

	
	var newStep=function()
	{
		var step=new Uint8Array(8);
		var note=255;
		var velo=255;
		step=[note,velo,255,255,255,255,255,255];
		return step;//[note,velo,fx,fx,cc1,cc1,cc2,cc2];
	}
	
	
	function init(){
		
		console.info('tracker init()',track_number);
		
		//init tracks
		tracks=new Array(track_number);
		for(var i=0;i<tracks.length;i++){
			tracks[i]=newTrack();
		}

		//init song
		song=new Array(64);
		for(var i=0;i<song.length;i++){
			song[i]=newSongRow();
		}		
		
		//init chains
		chains=new Array(255);
		for(var i=0;i<chains.length;i++){
			chains[i]=emptyChain();
		}
		
		//init phrases;
		console.log('init phrases()');
		phrases=new Array(255);
		for(var i=0;i<phrases.length;i++){
			phrases[i]=newPhrase();
		}
		
		console.info('song.length',song.length);
		console.info('chains.length',chains.length);
		console.info('phrases.length',phrases.length);
		//console.info('init ok');
	}

	
	var t=0;
	var tick=function(){
		
		if(t%3==0){
			
			for(var i=0;i<1;i++){
				// Play notes
				
				var songpos=tracks[i].pos0;
				var chainpos=tracks[i].pos1;
				var phrasepos=tracks[i].pos2;
				


				var chn=chain(song[songpos][i]);
				//console.log(songpos,chainpos,phrasepos,chn);
				var phrasenumber=chn[chainpos][0];
				var transpose=chn[chainpos][1];
				
				//if(transpose==255)transpose=0;
				
				var note=phrase(phrasenumber)[tracks[i].pos2][0];
				note=note+transpose;//tranpose note

				//console.log(tracks[i].pos2,note);
				//midiNote(tracks[i].chn,note,100);
				
				// Update counters
				tracks[i].pos2++;
				
				if (tracks[i].pos2>15) {
					
					// increment chain counter
					if (chain(song[songpos][i])[tracks[i].pos1+1][0]==255||chainpos==15) {
						tracks[i].pos1=0;
						console.log("Rewind chain", "Value="+chain(song[songpos][i])[tracks[i].pos1]);
					} else {
						tracks[i].pos1++;
						console.log("Jump to chain "+tracks[i].pos1, "Value="+chain(song[songpos][i])[tracks[i].pos1]);
					}
					
					tracks[i].pos2=0;
				}
			}
		}
		t++;
	}

	// reset counters
	var rewind=function(){
		console.log('rewind');
		for(var i=0;i<tracks.length;i++){
			tracks[i].pos0=0;//song
			tracks[i].pos1=0;//chain
			tracks[i].pos2=0;//phrase
		}
	}

	




	var makeJSON=function(){
		return {
			'song':song,
			'tracks':tracks,
			'chains':chains,
			'phrases':phrases
		};
	}
	
	
	return {
		init: init,
		tracks:tracks,
		song:songrow,
		chain:chain,
		phrase:phrase,
		tick:tick
	}
	

})();