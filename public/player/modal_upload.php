<?php
/**
 * Modal 'upload mid'
 */


$htm ='<form id=fupload>';
$htm.='<div class="row">';

$htm.='<input type=hidden id=upload_max_filesize value="'.ini_get('upload_max_filesize').'">';

// Select file
$htm.='<div class="col-12">';
$htm.='<div class="form-group">';
$htm.='<label>1 - Select file</label><br />';
$htm.='<input type="file" name=updoc id="loadFile" accept="audio/mid"><br />';
$htm.='<i class="text-muted" id=filestatus>Max filesize: '.ini_get('upload_max_filesize').'</i>';
$htm.='</div>';
$htm.='</div>';


$htm.='</div>';
$htm.='</form>';


$modal=new LTE\Modal;
$modal->id('modalUpload');
$modal->icon('fas fa-upload');
$modal->title('Load (mid)');
$modal->body($htm);
//$modal->footer('<button id=btnUpload class="btn btn-primary btn-sm"><i class="fa fa-upload"></i> Submit</button>');
echo $modal;
?>
<script type="text/javascript">
$(function(){

	'use strict';

	window.popLoad=function(){
		$('#modalUpload').modal('show');
	}

	$('#loadFile').change(function(evt) {

		console.log('#loadFile.change');

		var file = evt.target.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (function(file) {
			console.log(file);
			return function(e) {
				let ko=Math.floor(file.size/1024);
				let mo=ko/1024;
				if (mo>2) {
					console.error("File is too large: "+ko+"ko");
					$('#btnUploadDocument').attr('disabled', true).text("(file is too big)");
					$('select#docType').attr('disabled', true);
					$('#filestatus').html('<i class="fas fa-exclamation-triangle" style="color:#cc0000"></i> file is too big');
				}else{
					$('#btnUploadDocument').attr('disabled', false).text("Upload");
					$('select#docType').attr('disabled', false);
				}
				console.log(file.name, ko+"ko");
				//console.log(reader.result);
				Player.loadDataUri(reader.result);
				if(Player.validate()){
				    console.log("ok");
					$('#modalUpload').modal('hide');
				}else{
				    console.log("nope");
				}

			}
		})(file);
		reader.readAsDataURL(file);
	});

	$('#btnUploadDocument').click(function(){
		uploadFile();
	});

	// Upload //
	function uploadFile(){

		if(!$('select#docType').val()){
			$('select#docType').focus();
			return;
		}

		let file=$('#modalUpload input[type=file]')[0].files[0];

		if (!file) {
			console.error("no file");
			$('#modalUpload input[type=file]').focus();
			return;
		}


		$('.overlay').show();

	}
});
</script>