<?php
/**
 * [$box description]
 * @var LTE
 */
$box=new LTE\Box;
$box->title("Messages");
$box->icon("fa fa-terminal");
$box->id("boxLog");
//$box->collapsable(true);
$box->body("Select midi output");
echo $box;