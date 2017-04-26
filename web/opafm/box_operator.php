<?php
//box operator

/*
 <Operator id="0">
    <volume>199</volume>
    <coarse>32</coarse>
    <fine>0</fine>
    <envAttack>242</envAttack>
    <envDecay>238</envDecay>
    <envSusLevel>232</envSusLevel>
    <envIniLevel>252</envIniLevel>
    <envRelease>255</envRelease>
    <LFOSpeed>255</LFOSpeed>
    <LFOAmount>245</LFOAmount>
    <feedback>0</feedback>
    <flags>0</flags>
</Operator>
*/
$htm='';
$htm.='<div class=row>';

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>Volume</label>';
$htm.='<input type=range data-cc='.($OP*16+0).' value=120 max=127 name=volume>';
$htm.='</div></div>';


$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>Coarse</label>';
$htm.='<input type=range data-cc='.($OP*16+1).' value=12 max=127 name=coarse>';
$htm.='</div></div>';
/*
$htm.='<div class=col-sm-3>';
$htm.='<div class="form-group">';
$htm.='<label>Fine</label>';
$htm.='<input type=range data-cc='.($OP*16+2).' value=0 max=127 name=fine>';
$htm.='</div></div>';
*/

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>IniLevel</label>';
$htm.='<input type=range data-cc='.($OP*16+3).' value=0 max=127 name=envIniLevel>';
$htm.='</div></div>';


$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>Attack</label>';
$htm.='<input type=range data-cc='.($OP*16+4).' value=0 max=127 name=envAttack>';
$htm.='</div></div>';

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>Decay</label>';
$htm.='<input type=range data-cc='.($OP*16+5).' value=0 max=127 name=envDecay>';
$htm.='</div></div>';

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>Sustain</label>';
$htm.='<input type=range data-cc='.($OP*16+6).' value=0 max=127 name=envSusLevel>';
$htm.='</div></div>';

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>Release</label>';
$htm.='<input type=range data-cc='.($OP*16+7).' value=0 max=127 name=envRelease>';
$htm.='</div></div>';

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>LFO Speed</label>';
$htm.='<input type=range data-cc='.($OP*16+8).' value=0 max=127 name=LFOSpeed>';
$htm.='</div></div>';

$htm.='<div class=col-xs-3>';
$htm.='<div class="form-group">';
$htm.='<label>LFO Amount</label>';
$htm.='<input type=range data-cc='.($OP*16+9).' value=0 max=127 name=LFOAmount>';
$htm.='</div></div>';

if ($OP==4) {
    $htm.='<div class=col-xs-3>';
    $htm.='<div class="form-group">';
    $htm.='<label>Feedback</label>';
    $htm.='<input type=range data-cc='.($OP*16+10).' value=0 max=127 name=feedback>';
    $htm.='</div></div>';

    $htm.='<div class=col-xs-3>';
    $htm.='<div class="form-group">';
    $htm.='<label>Flags</label>';
    $htm.='<input type=range data-cc='.($OP*16+11).' value=0 max=127 name=flags>';
    $htm.='</div></div>';
}


$htm.='</div>';//endrow


$box=new LTE\Box;
$box->title("Operator ".$OP);
//$box->icon("fa fa-filter");
$box->id("boxOperator$OP");
//$box->boxTools("<button class=\"btn btn-box-tool\" title='Clear'><i class='fa fa-times'></i></button> ");

$box->body($htm);
//$box->collapsable(1);
$box->loading(1);
echo $box;

