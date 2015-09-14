<?php
/**
 * AdminLte Alert
 * https://almsaeedstudio.com/themes/AdminLTE/pages/widgets.html
 */

namespace LTE;

Class Alert
{ 
    private $id='';
    private $type='danger';
    private $title='Alert';
    private $body='Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    private $icon='fa fa-ban';
    
    
    public function __construct ($type = '', $title = '', $body = '')
    {
        //$this->id = md5(rand(0, time()));
        $this->type($type);
        $this->title($title);
        $this->body($body);
    }

    public function id($str='')
    {
        if($str)$this->id=$str;
        return $this->id;
    }

    public function icon($str='')
    {
        if($str)$this->icon=$str;
        return $this->icon;   
    }

    public function type($str='')
    {
        if($str)$this->type=$str;
        return $this->type;
    }

    public function title($str=''){
        if($str)$this->title=$str;
        return $this->title;
    }
    
    public function body($str=''){
        if($str)$this->body=$str;
        return $this->body;
    }

    public function html($type = '', $title = '', $body = '')
    {
        
        if($type)$this->type=$type;
        if($title)$this->title=$title;
        if($body)$this->body=$body;

        $HTML=[];
        $HTML[]="<div class='alert alert-".$this->type. " alert-dismissable' id='".$this->id."'>";
        $HTML[]="<button type=button class=close data-dismiss=alert aria-hidden=true>×</button>";
        $HTML[]='<h4><i class="'.$this->icon.'"></i>  '.$this->title.'</h4>';
        
        $HTML[]=$this->body;
        $HTML[]="</div>";
        return implode("\n", $HTML);
    }

    public function __toString()
    {
        return $this->html();
    }
}

/*
<div class="alert alert-danger alert-dismissable">
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
<h4><i class="icon fa fa-ban"></i> Alert!</h4>
Danger alert preview. This alert is dismissable. Lorem lipsum.
</div>
*/