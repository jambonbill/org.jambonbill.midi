function SidV2() {

	var _b64='';
	var _bin=[];
	var _patch=[];	
	
	function twoscomplement(bin){

	};


	var decode64=function(base64data){
		console.info('decode64(base64data)');
		_b64=base64data;
		var datastr=atob(_b64);
		console.info('datastr.length='+datastr.length);
		_bin=[];
		for(var i=0;i<datastr.length;i++){
			_bin.push(datastr.charCodeAt(i));
		}
		
		decode();
		
		return _bin;
	}

	
	var load=function(bin){
		console.log('load',bin);
		_bin=bin;
		decode();
	}

	
	var decode=function(){
		
		console.info('decode()',_bin.length);
		

		_patch= new Uint8Array(512);
		for(var i=0;i<512;i++){
			var low=_bin[i+10];
			var high=_bin[i+11];
			var b=(low+high)*16;
			_patch[i]=b;
		}
		console.info(_patch.length,_patch);
		patchName();
	}	
	
	var patchName=function(){
		
		
		var name='';
		for(var i=0;i<16;i++){
			name+=String.fromCharCode(_patch[i]);
		}
		console.info('patchName()',name);
		return name;
	}

	return{
		'load':load,
		'twoscomplement':twoscomplement,
		'decode64':decode64,
		'decode':decode,
		'patchName':patchName
	}
}

console.info('sidv2.js');
