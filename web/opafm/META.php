<?php
$META=[];//http://ogp.me

// TWITTER META
$META[]=['name'=>"twitter:card",    'content'=>'summary'];
//$META[]=['name'=>"twitter:card",    'content'=>'summary_large_image'];
$META[]=['name'=>"twitter:site",    'content'=>"@jambonbill"];
$META[]=['name'=>"twitter:title",   'content'=>"OPA Editor"];
$META[]=['name'=>"twitter:description", 'content'=>"Jambonbill OPA Editor"];
$META[]=['name'=>"twitter:image",   'content'=>'./img/icon-512.png'];

// FACEBOOK META
$META[]=['property'=>'og:url',      'content'=>'http://midi.jambonbill.org'];
$META[]=['property'=>"og:type",     'content'=>"article"];
$META[]=['property'=>"og:title",    'content'=>"OPA Editor"];
$META[]=['property'=>"og:description", 'content'=>'Jambonbill OPA Editor'];
$META[]=['property'=>"og:image",    'content'=>'./img/icon-512.png'];//todo
$META[]=['property'=>"og:locale",   'content'=>"en_US"];

// DESCRIPTION
$META[]=['name'=>"description", 'Jambonbill OPA Editor'];

$admin->meta($META);//Set Meta's
