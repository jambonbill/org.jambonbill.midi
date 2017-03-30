<?php
//admin :: UPLOAD CSV
header('Content-Type: text/html; charset=utf-8');
session_start();

require __DIR__."/../../vendor/autoload.php";
require __DIR__."/../../src/MIDI/midi.class.php";

$admin = new LTE\AdminLte2();
$admin->title("Upload");
echo $admin;

$midi = new Midi();
?>

<section class="content-header">
    <h1><i class='fa fa-upload'></i> UPLOAD</h1>
</section>

<section class="content">

<div class='row'>

    <div class='col-md-6'>
    <?php
    // CSV FILE UPLOAD //
    if (isset($_FILES)&&isset($_FILES["file"]["name"])) {

        $fileType = pathinfo($_FILES["file"]["name"],PATHINFO_EXTENSION);

        if($fileType=='mid'&&isset($_POST["submit"])) {
            $file=$_FILES["file"]["tmp_name"];
            if(!$handle = fopen($file, "r")){
                die("Error opening $fn");
            }

            $midi->importMid($file);

            $f=[];
            $f['name']=basename($file);
            $f['size']=filesize($file);

            // get midifile info //
            $f['bpm']=$midi->getBpm();//returns tempo as beats per minute (0 if tempo not set).
            $f['timebase']=$midi->getTimebase();//returns timebase value.
            $f['trackCount']=$midi->getTrackCount();//returns number of tracks.
            //print_r($f);
            echo '<li>Current script owner: ' . get_current_user();
            move_uploaded_file($file, __DIR__."/../../midifiles/".basename($file));

            $box=new LTE\Box();
            $box->title("Done");
            $box->icon("fa fa-cog");
            $box->html('<pre>'.print_r($f,1).'</pre>');
            $box->footer('<a href=index.php class="btn btn-default">Continue <i class="fa fa-arrow-right"></i></a>');
            echo $box;
            //echo '<script>setTimeout(function(){document.location.href="index.php";},3000)</script>';
        } else {
            echo new LTE\Callout("danger","<i class='fa fa-warning'></i> File type Error","or something wrong");
        }
    }
    ?>
    </div>

    <div class='col-md-6'>
    <?php
    echo '<pre>'.print_r($_FILES,1).'</pre>';
    ?>
    </div>


</div>

<?php
