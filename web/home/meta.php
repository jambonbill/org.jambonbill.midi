<?php
$META=[];//http://ogp.me

// TWITTER META
$META[]=['name'=>"twitter:card",    'content'=>'summary'];
$META[]=['name'=>"twitter:site",    'content'=>"@jambonbill"];
$META[]=['name'=>"twitter:title",   'content'=>"midi.jambonbill.org"];
$META[]=['name'=>"twitter:description", 'content'=>'MIDI tools and stuff'];
$META[]=['name'=>"twitter:image",   'content'=>'https://midi.jambonbill.org/dist/img/midi.gif'];

// FACEBOOK META
$META[]=['property'=>'og:url',      'content'=>'http://midi.jambonbill.org'];
$META[]=['property'=>"og:type",     'content'=>"article"];
$META[]=['property'=>"og:title",    'content'=>"midi.jambonbill.org"];
$META[]=['property'=>"og:description", 'content'=>'MIDI tools and stuff'];
$META[]=['property'=>"og:image",    'content'=>'https://midi.jambonbill.org/dist/img/midi.gif'];
$META[]=['property'=>"og:locale",   'content'=>"en_US"];

// LAW DESCRIPTION
$META[]=['name'=>"description",   'content'=>'MIDI tools and stuff'];

//
$admin->meta($META);//Set Meta's