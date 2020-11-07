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

/*
<link rel="canonical" href="https://www.petcorp.org/" />
<meta property="og:title" content="PET.CORP" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.petcorp.org/" />
<meta property="og:image" content="https://www.petcorp.org/wp-content/uploads/2018/01/cropped-PETCORP_A4_A-01.png" />
<meta property="og:site_name" content="PET.CORP" />
<meta property="og:description" content="The PETSCII Corporation" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@pet_corp" />
<meta name="twitter:domain" content="www.petcorp.org" />
<meta name="twitter:title" content="PET.CORP" />
<meta name="twitter:description" content="The PETSCII Corporation" />
<meta name="twitter:image" content="https://www.petcorp.org/wp-content/uploads/2018/01/cropped-PETCORP_A4_A-01.png" />
<meta itemprop="image" content="https://www.petcorp.org/wp-content/uploads/2018/01/cropped-PETCORP_A4_A-01.png" />
 */