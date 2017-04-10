<?php
$box=new LTE\Box;
$box->title("MBSID Patches");
$box->id("boxPatches");
$box->collapsable(true);
$box->body("<pre>please wait</pre>");
$box->loading(1);
echo $box;
