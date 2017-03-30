<?php
$htm=[];
$htm[]='<form action="upload.php" method="post" enctype="multipart/form-data" class="form-control">';
$htm[]='<input type="file" name="file" id="file" accept=".xml" required><br />';
$htm[]='<input type="submit" value="Upload xml file" name="submit" id=btnSubmit class="form-control"><br />';
$htm[]='</form>';
$htm[]='<br />';
$htm[]='<br />';


$modal=new LTE\Modal;
$modal->id('modalUpload');
$modal->icon('fa fa-upload');
$modal->title('Upload xml patch');
$modal->body($htm);
$modal->footer('<a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>');
echo $modal;