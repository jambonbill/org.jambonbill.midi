<?php
$box=new LTE\Card;
$box->id('boxInputs');
$box->title('MIDI input(s)');
$box->body();
//$box->footer('<a href=#btn id=btnRefresh1 class="btn btn-default">refresh</a>');
$box->p0(true);
$box->loading(1);
echo $box;//Hello, this is a snippet.