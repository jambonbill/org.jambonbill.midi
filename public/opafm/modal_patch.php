<?php
// MOdal Patches //
$modal=new LTE\Modal;
$modal->id('modalPatches');
$modal->icon('fa fa-folder-open-o');
$modal->title('Patch bank');
$modal->body('<pre>please wait</pre>');
$modal->footer('<a href=#btn class="btn btn-default" data-dismiss=modal>Cancel</a>');
echo $modal;
