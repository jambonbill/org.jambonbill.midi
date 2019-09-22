<?php
/**
 * Box file
 * @var LTE
 */

$box=new LTE\Card;
$box->id('boxFile');
//$box->title('File');
//$box->tools('<input type=text class="form-control form-control-sm" placeholder="search">');
$box->body('hi');
//$box->small('small text');

$btns ='<button class="btn btn-default btn-sm" id=btnLoad><i class="far fa-folder-open"></i> Load</button> ';
$btns.='<button class="btn btn-default btn-sm" id=btnPlay><i class="fas fa-play"></i> Play</button> ';
$btns.='<button class="btn btn-default btn-sm" id=btnStop><i class="fas fa-stop"></i> Stop</button>';

$box->footer($btns);
//$box->collapsable(true);
$box->p0(true);
$box->loading(1);
echo $box;
?>
<script type="text/javascript">
$(()=>{

	$('#btnLoad').click(()=>{
		popLoad();
	});

	$('#btnPlay').click(()=>{
		Player.play();
	});

	$('#btnStop').click(()=>{
		Player.stop();
	});

	window.fileInfo=function(){
		console.log('fileInfo');
		console.log(Player.getFormat() );
	    console.log(Player.getSongTime() );
	    console.log(Player.getTotalEvents() );
	}
});
</script>