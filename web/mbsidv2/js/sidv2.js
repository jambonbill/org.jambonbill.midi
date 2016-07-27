function SidV2() {

	var _b64='';
	var _bin=[];
	var _patch=[];	
	
	var patchData={};

	function twoscomplement(bin){

	};


	var decode64=function(base64data){
		
		//console.info('decode64(base64data)');
		
		_b64=base64data;
		var datastr=atob(_b64);
		
		//console.info('datastr.length='+datastr.length);
		
		_bin=[];
		var hexstr='';
		for(var i=0;i<datastr.length;i++){
			_bin.push(datastr.charCodeAt(i));
			var x=datastr.charCodeAt(i).toString(16);
			if(x.length==1)x='0'+x;
			hexstr+=x+' ';
		}
		//console.log(hexstr);
		decode();
		return _bin;
	}

	
	var load=function(bin){
		//console.log('load',bin);
		_bin=bin;
		decode();
	}

	
	var decode=function(){
		
		//console.info('decode()',_bin.length + " bytes");
		
		_head=new Uint8Array(10);

		patchData['device-number']=_bin[5];
        patchData['bank']=_bin[8];
        patchData['patch']=_bin[9];

		//_patch= new Uint8Array(512);
		_patch=[];
		for(var i=10;i<1036;i+=2){
			var low=_bin[i];
			var high=_bin[i+1];
			var b=low+high*16;
			_patch.push(b);
		}
		patchName();

		patchData['engine']=_patch[0x010] & 0x0f;//0=Lead, 1=Bassline, 2=Drum, 3=Multi
        patchData['extSwitch']=_patch[0x014];// | [7:0] External Switches on/off

		var KNOBS=[];
        for(var i=0;i<8;i++){
            /*
                  | Knob #1 (Modulation Wheel)
            0x018 | [7:0] Parameter Assignment #1
            0x019 | [7:0] Parameter Assignment #2
            0x01a | [7:0] Initial Value
            0x01b | [7:0] Min. Value
            0x01c | [7:0] Max. Value
             */
            var addr=0x018+(i*5);
            var P1 =_patch[addr];
            var P2 =_patch[addr+1];
            var INI=_patch[addr+2];
            var MIN=_patch[addr+3];
            var MAX=_patch[addr+4];
            KNOBS.push([P1,P2,INI,MIN,MAX]);
        }
        
        patchData['knobs']=KNOBS;


        // FILTERS //


		var left={};
		//_patch[0x054];
		left['osc1']=0;
      	left['osc2']=0;
      	left['osc3']=0;
      	left['ext']=0;
      	left['lp']=0;
      	left['bp']=0;
      	left['hp']=0;
      	left['osc3Off']=0;
		/*
		0x055 | [7:0] Low byte of 12bit CutOff Frequency
		0x056 | [3:0] High nibble of 12bit CutOff Frequency
      		  | [6:4] reserved
      	*/
		var cutoff=_patch[0x055]+(_patch[0x056]&0x0f*255);
		left['cutoff']=cutoff;
		left['resonance']=_patch[0x057];
		left['keytracking']=_patch[0x058];
		left['reserved']=_patch[0x059];
        patchData['filt_left']=left;
        

        //patchData['filt_right']=rght;// TODO

        // -- 6 VOICES -- //
        var voices=[];

        for (var i=0;i<6;i++) {
	        var voice={};
	        voice['portamento']=_patch[0x061];
	        voice['type']=_patch[0x061];
	        voice['dca']={// todo
	        	'a':_patch[0x062]&0x0f,
	        	'd':_patch[0x062]&0x0f,
	        	's':_patch[0x063]&0x0f,
	        	'r':_patch[0x063]&0x0f
	        };
	        //0x064 | [7:0] Pulsewidth Low byte
			//0x065 | [3:0] Pulsewidth High nibble
	        voice['pulsewidth']=_patch[0x064]+(_patch[0x065]&0x0f*255);//12bit
	        voice['accent']=_patch[0x066];//(0-255) (not relevant for Lead/Multi, only used by Bassline Engine)
	        voice['dcaEnvelopeDelay']=_patch[0x067];//(0-255)
	        voice['transpose']=_patch[0x068];// | [6:0]  (-64..63) TODO
	        voice['finetune']=_patch[0x069];//(-128..127)
	        voice['pitchrange']=_patch[0x06a];//(0..127)
	        voice['portamentoRate']=_patch[0x06b];// | [7:0]  (0..255)
	        
	        voice['arpMode']=_patch[0x06c];//todo
      		voice['arpSpeedDivider']=_patch[0x06d];
      		voice['arpGatelength']=_patch[0x06e];
      		voice['swinSIDMode']=_patch[0x06f];

	        voices.push(voice);
        }
        
        patchData['voices']=voices;


        // 6 LFO's // TODO //

       	// 8 * Modulation Path // TODO 
       
       	// 4 x Wavetable Sequencer #1 // TODO

        switch(patchData['engine']){
        	default:
        		decodeLead();
        		break;
        }

		console.info(patchData);
	}	
	

	function decodeLead(){
		
		//console.info('decodeLead()');
		/*
		0x050 | [0] 0=Mono, 1=Legato
      | [1] WTO (Wavetable Only)
      | [2] SusKey (Fingered Portamento)
      | [7:3] reserved
------+--------------------------------------------------------------------------
0x051 | [7:0] Oscillators Detune (0-255)

------+--------------------------------------------------------------------------
0x052 | [6:0] Volume (0-127, only most significant 4bits are used by SID)
      | [7] reserved
------+--------------------------------------------------------------------------
0x053 | Oscillators Phase Offset (0-255)
		 */
		patchData['osc_detune']=_patch[0x051];
		patchData['volume']=_patch[0x052];
		patchData['osc_phase_offset']=_patch[0x053];
	}
	
	this.patch=function(){
		return _patch;
	}
	
	
	var patchName=function()
	{
		var name='';
		for(var i=0;i<16;i++){
			name+=String.fromCharCode(_patch[i]);
		}
		patchData['patchName']=name;
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
