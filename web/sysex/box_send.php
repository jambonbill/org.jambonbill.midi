<?php
$box=new LTE\Box;
$box->title("Send");
$box->icon("fa fa-text");
$box->id("boxSend");
$box->collapsable(true);
$box->body("<textarea class='form-control' id=midi_send rows=10 placeholder='Paste your hex code here' style='font-family:monospace;width:100%' readonly></textarea>");
$btns=[];
$btns[]="<div class=row>";
$btns[]="<div class=col-sm-6>";
$btns[]="<a href=# class='btn btn-default' id=btnLoadSysex disabled><i class='fa fa-folder-open-o'></i> Load .syx</a> ";
$btns[]="<a href=# class='btn btn-default' id=btnSendSysex disabled><i class='fa fa-play'></i> Send</a>";
$btns[]="</div>";
$btns[]="<div class=col-sm-6>";
$btns[]="<select class=form-control id=midiOutput>";
$btns[]="<option>Select midi output";
$btns[]="</select>";
$btns[]="</div>";
$btns[]="</div>";
$box->footer($btns);
echo $box;


// MODAL //

$htm=[];
//$htm[]='<form enctype="multipart/form-data" class="form-control">';//action="upload.php" method="post"
$htm[]='<input type="file" name="file" id="loadFromFile" accept=".syx" required><br />';
//$htm[]='<input type="submit" value="Upload file" name="submit" id=btnSubmit class="form-control"><br />';
//$htm[]='</form>';
$htm[]='<br />';
$htm[]='<br />';


$modal=new LTE\Modal;
$modal->id('modalSysex');
$modal->title('Load sysex from file');
$modal->icon('fa fa-upload');
$modal->body($htm);
$btns=[];
$btns[]='<a href=# class="btn btn-default" data-dismiss=modal>Cancel</a>';
$modal->footer($btns);
echo $modal;