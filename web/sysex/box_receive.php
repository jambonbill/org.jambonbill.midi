<?php
$box=new LTE\Box;
$box->title("Receive");
$box->icon("fa fa-text");
$box->id("boxReceive");
$box->collapsable(true);
$box->boxTools("<button class=\"btn btn-box-tool btnclipboard\" title='Copy to clipboard'><i class='fa fa-copy'></i></button> ");
$box->body("<textarea class='form-control' id=sysex_in rows=10 readonly></textarea>");
$box->footer("<a href=#save id=saveSysex class='btn btn-default'><i class='fa fa-save'></i> Save</a>");
echo $box;