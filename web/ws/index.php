<?php
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";

$admin = new LTE\Admin(__DIR__."/../../config/config.json");
echo $admin->head();
?>


<section class="container">


<style>
    
    div { width:500px; margin-left:auto; margin-right:auto;}
    #content { padding:5px; background:#FFF;
        overflow-y: scroll; border:1px solid #CCC;
        margin-top:10px; height: 160px; }
    
    #input { border-radius:2px; border:1px solid #ccc;
        margin-top:10px; padding:5px; width:400px;
    }
    
    #status { width:88px;display:block;float:left;margin-top:15px; }

  </style>


    <div id="content"></div>

    <div>
      <span id="status">Connecting...</span>
      <input type="text" id="input" class="form-control" placeholder=message>
    </div>
<hr />
<li>noteOn(0,40,100)
<li>noteOff(0,40,0)
<li>prgChange(0,40)

<script type="text/javascript" src="js/frontend.js"></script>

<style>
div.dg {z-index:1100 !important;}
</style>
  

