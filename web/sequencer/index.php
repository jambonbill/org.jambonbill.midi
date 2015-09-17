<?php
// MIDI 
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\AdminLte2();
$admin->title("MIDI Sequencer");
echo $admin;

?>
<section class="content-header">
  <h1><i class='fa fa-keyboard-o'></i> MIDI Sequencer
  <small></small>
  </h1>
</section>


<section class="content">


<script type="text/javascript" src='js/keyboard.js'></script>

<?php
$admin->footer("Midi - Sequencer");
$admin->end();
