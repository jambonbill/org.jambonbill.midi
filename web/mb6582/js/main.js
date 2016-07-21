$(function(){
	
	var _files;
	$.post('ctrl.php',{'do':'browse'},function(json){
		console.log(json);
		_files=json.files;
		listFiles();
	}).error(function(e){
		console.error(e.responseText);
	});

	
	function listFiles(){
		
		console.info('listFiles()');
		
		var htm='<table class="table table-condensed table-hover" style="cursor:pointer">';
		
		htm+='<thead>';
		htm+='<th>Name</th>';
		htm+='<th>Size</th>';
		htm+='<thead>';
		htm+='</thead>';
		htm+='<tbody>';
		
		for(var i in _files){
			var o=_files[i];
			htm+='<tr title="'+o.name+'">';
			htm+='<td>'+o.name;
			htm+='<td style="text-align:right">'+o.size;
		}
		
		htm+='</tbody>';
		htm+='</table>';
		
		$("#boxFiles .box-title").html(_files.length+" file(s)");
		$("#boxFiles .box-body").html(htm);
		$("#boxFiles table").tablesorter();
		$("#boxFiles tbody>tr").click(function(e){
			//console.log(e.currentTarget.title);
			preview(e.currentTarget.title);
		});
	}


	function preview(filename){
		
		console.info('preview()',filename);
		if(!filename)return;

		$.post('ctrl.php',{'do':'preview','file':filename},function(json){
			
			console.log(json);
			
		}).error(function(e){
			console.error(e.responseText);
		});
	}

});