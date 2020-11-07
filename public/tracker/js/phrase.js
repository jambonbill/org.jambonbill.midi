
function printPhrase(n){
	
	var d=tracker.phrase(n);
	
	if (n<0) {//glitch in the matrix
		console.warn('printPhrase(n)',n);
		return;
	}
	
	
	var htm=[];
	htm.push("PHRASE 0x"+hexv(n)+" - "+nav.phrasexy[0]+"x"+nav.phrasexy[1]+"<br />");
	htm.push("<br />");
	for(var i=0;i<16;i++){
		var row=[];
		row.push(i.toString(16));
		
		for(var j=0;j<8;j++){
			if(i==nav.phrasexy[1]&&j==nav.phrasexy[0]){
				row.push("<span style='color:white'>");
			}
			if(j==0){
				row.push(nToNote(d[i][0]));		
			}else{
				row.push(hexv(d[i][j]));
			}
			if(i==nav.phrasexy[1]&&j==nav.phrasexy[0]){
				row.push("</span>");
			}
		}
		
		row.push("<br />");
		
		htm.push(row.join(' '));
	}
	return htm.join(' ');
}