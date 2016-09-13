
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

		var htm='<table class="table table-condensed table-hover">';
		
		htm+='<thead>';
		htm+='<th>filename</th>';
		htm+='<th>size</th>';
		htm+='<th>size</th>';
		htm+='</thead>';
		
		htm+='<tbody>';
		
		for(var i in files){
			var o=files[i];
			htm+='<tr>';
			htm+='<td>'+o.name;
			htm+='<td>'+o.size;
		}
		
		htm+='</tbody>';
		htm+='</table>';
		
		$('#boxFiles .box-body').html(htm);
		$('#boxFiles .overlay').hide();
		$('#boxFiles table').tablesorter();
	}

});
