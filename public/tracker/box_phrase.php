<?php
$box=new LTE\Box;
$box->title("Phrase #0");
//$box->icon("fa fa-plug");
$box->id("boxPhrase");
$box->collapsed(0);
$box->body("<pre>hi</pre>");
echo $box;