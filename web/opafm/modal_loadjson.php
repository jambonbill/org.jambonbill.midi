<?php
// Modal Load Json
$htm='<form enctype="multipart/form-data" class="form-control">';
$htm.='<input type="file" id="loadFromJSON" accept=".json" required><br />';
$htm.='<input type="submit" value="Upload json file" name="submit" id=btnSubmit class="form-control"><br />';
$htm.='</form>';
$htm.='<br />';
$htm.='<br />';


$modal=new LTE\Modal;
$modal->id('modalOpen');
$modal->icon('fa fa-folder-open-o');
$modal->title('Open json patch');
$modal->body($htm);
$modal->footer('<a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>');
echo $modal;

