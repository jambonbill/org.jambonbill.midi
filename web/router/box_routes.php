<?php
$box=new LTE\Box;
$box->id('boxRoutes');
//$box->icon('fa fa-edit');
$box->title('Routes');
$box->body('<pre>please wait</pre>');
//$box->footer('<a href=# class="btn btn-default"><i class="fa fa-times"></i> Save</a>');
$box->collapsable(1);
$box->loading(1);
echo $box;