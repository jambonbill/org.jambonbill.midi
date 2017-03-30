
$(function(){
	var files=[];
	$.post('ctrl.php',{'do':'browse'},function(json){

		console.log(json);
		files=json.files;
		displayFiles();

	}).error(function(e){
		console.error(e.responseText);
	});

	function displayFiles(){

		console.info('displayFiles()',files);

		var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';

		htm+='<thead>';
		htm+='<th>Filename</th>';
		htm+='<th style="text-align:right">Bpm</th>';
		htm+='<th style="text-align:right" title="Timebase">Tbase</th>';
		htm+='<th style="text-align:right" title="PPQNPerMIDIClock = TimeBase/24 ">PPQN</th>';
		htm+='<th style="text-align:right">Tracks</th>';
		htm+='<th style="text-align:right">Size</th>';
		htm+='</thead>';

		htm+='<tbody>';

		for(var i in files){
			var o=files[i];
			htm+='<tr title="'+o.name+'">';
			htm+='<td>'+o.name;

			htm+='<td style="text-align:right">';//bpm
			if(o.bpm)htm+=o.bpm;

			htm+='<td style="text-align:right">'+o.timebase;
			htm+='<td style="text-align:right">'+o.timebase/24;
			htm+='<td style="text-align:right">'+o.trackCount;
			htm+='<td style="text-align:right">';//in ko
			var k=o.size/1024;
			htm+=Math.round(k)+"k";
		}

		htm+='</tbody>';
		htm+='</table>';

		$('#boxFiles .box-body').html(htm);
		$('#boxFiles .overlay').hide();
		$('#boxFiles table').tablesorter();

		$('#boxFiles tbody>tr').click(function(e){

			var fn=e.currentTarget.title;
			//console.log(fn);

			$.post('ctrl.php',{'do':'fileInfo','filename':fn},function(json){
				console.log(json);
				//$('#myModal .modal-title').modal(filename);
			}).error(function(e){
				console.error(e.responseText);
			});

			$('#modalFile').modal('show');
		});
	}

	$('#btnUpload').click(function(){
		$('#modalUpload').modal('show');
	});

});
