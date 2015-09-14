<?php
/**
 * AdminLte2 Timeline
 * https://almsaeedstudio.com/themes/AdminLTE/pages/UI/timeline.html
 */


namespace LTE;

Class Timeline
{
    //private $id ='';
    //private $title='title';
    
    public function __construct ()
    {
        //$this->id = md5(rand(0,time()));
        //$this->title = $title;
        //$this->body = $body;
        //$this->footer = $footer;
        //echo "Youpi !!";
    }

    public function id($str = ''){
        $this->id=$str;
    }
    
    public function icon($str = ''){
        $this->icon=$str;
    }

    public function html()
    {
        $HTML=[];
        $HTML[]='<ul class="timeline">';

            //<!-- timeline time label -->
            $HTML[]='<li class="time-label">';
                $HTML[]='<span class="bg-red">';
                    $HTML[]='10 Feb. 2014';
                $HTML[]='</span>';
            $HTML[]='</li>';
            //<!-- /.timeline-label -->

            //<!-- timeline item -->
            $HTML[]='<li>';
                //<!-- timeline icon -->
                $HTML[]='<i class="fa fa-envelope bg-blue"></i>';
                $HTML[]='<div class="timeline-item">';
                    $HTML[]='<span class="time"><i class="fa fa-clock-o"></i> 12:05</span>';

                    $HTML[]='<h3 class="timeline-header"><a href="#">Support Team</a> ...</h3>';

                    $HTML[]='<div class="timeline-body">';
                        //...
                        $HTML[]='Content goes here';
                    $HTML[]='</div>';

                    $HTML[]='<div class="timeline-footer">';
                        $HTML[]='<a class="btn btn-primary btn-xs">...</a>';
                    $HTML[]='</div>';
                $HTML[]='</div>';
            $HTML[]='</li>';
            //<!-- END timeline item -->
        $HTML[]='</ul>';
        
        return implode("\n", $HTML);
    }

    public function __toString()
    {
        return $this->html();
    }
}

/*
<ul class="timeline">

    <!-- timeline time label -->
    <li class="time-label">
        <span class="bg-red">
            10 Feb. 2014
        </span>
    </li>
    <!-- /.timeline-label -->

    <!-- timeline item -->
    <li>
        <!-- timeline icon -->
        <i class="fa fa-envelope bg-blue"></i>
        <div class="timeline-item">
            <span class="time"><i class="fa fa-clock-o"></i> 12:05</span>

            <h3 class="timeline-header"><a href="#">Support Team</a> ...</h3>

            <div class="timeline-body">
                ...
                Content goes here
            </div>

            <div class='timeline-footer'>
                <a class="btn btn-primary btn-xs">...</a>
            </div>
        </div>
    </li>
    <!-- END timeline item -->

    ...

</ul>
 */