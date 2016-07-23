function SidV2(base64data) {

	var _b64=base64data;
	var _bin=[];
	var _patch=[];	
	function twoscomplement(bin){

	};


	var decode=function(){
		console.info('decode(bin)');
		
		var datastr=atob(_b64);
		_bin=[];
		for(var i=0;i<datastr.length;i++){
			_bin.push(datastr.charCodeAt(i));
			/*
			ch.push(datastr.charCodeAt(i));
			co.push(datastr.charCodeAt(i+1));
			if(ch.length==json.cols*json.rows){
				//charDat.push(ch);
				//colrDat.push(co);
				json.charData.push(ch);
				json.colorData.push(co);
				ch=[];
				co=[];
			}
			*/
		}

		console.info(_bin.length);
		_patch= new Uint8Array(512);
		for(var i=0;i<512;i++){
			var low=_bin[i+10];
			var high=_bin[i+11];
			var b=(low+high)*16;
			_patch[i]=b;
		}
		console.info(_patch.length,_patch);
	}	
	
	return{
		'twoscomplement':twoscomplement,
		'decode':decode
	}

}

console.info('sidv2.js');
