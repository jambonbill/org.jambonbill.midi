<?php
$box=new LTE\Box;
$box->id("boxReceive");
$box->title("Receive");
$box->icon("fa fa-text");
//$box->boxTools("<button class=\"btn btn-box-tool btnclipboard\" title='Copy to clipboard'><i class='fa fa-copy'></i></button> ");
$box->body("<textarea class='form-control' id=sysex_in rows=10 readonly></textarea>");
$box->footer("<a href=#save id=saveSysex class='btn btn-sm btn-default' disabled><i class='fa fa-save'></i> Save .syx</a>");
$box->collapsable(true);
$box->loading(true);
echo $box;