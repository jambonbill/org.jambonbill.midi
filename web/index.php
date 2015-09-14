<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-wikipedia-w'></i> MIDI
  <small></small>
  </h1>
</section>


<section class="content">
<?php




