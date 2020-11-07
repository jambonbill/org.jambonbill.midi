<?php
$box=new LTE\Card;
$box->id('boxOutputs');
$box->title('MIDI output(s)');
$box->body();
//$box->footer('<a href=#btn id=btnRefresh2 class="btn btn-default">refresh</a>');
$box->p0(true);
$box->loading(1);
echo $box;