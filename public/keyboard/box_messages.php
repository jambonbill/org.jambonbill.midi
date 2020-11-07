<?php
/**
 * [$box description]
 * @var LTE
 */
$box=new LTE\Card;
$box->title("Messages");
$box->icon("fa fa-terminal");
$box->id("boxLog");
//$box->collapsable(true);
$box->body('<i class="text-muted">Select midi output</i>');
echo $box;