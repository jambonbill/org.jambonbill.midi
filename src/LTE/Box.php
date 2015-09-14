<?php
/**
 * A number of helper to build nice widgets for adminlte2
 * @author jambonbill
 */
namespace LTE;

/**
 * AdminLte Box Maker
 * http://almsaeedstudio.com/AdminLTE/pages/widgets.html
 */
class Box
{
    private $id='';
    private $type='solid';
    private $icon='';
    private $iconUrl='';
    private $color='';
    private $class='';
    private $style='';
    private $title='';
    private $small='';//
    private $boxTools='';//(mini top tray on the right)
    private $body='';
    private $body_padding=true;//box-body no-padding
    private $footer='';
    private $collapsable=false;
    private $collapsed=false;
    private $removable=false;
    private $loading=false;

    public function __construct ()
    {
        $this->id = md5(rand(0, time()));
    }

    /**
     * Box types : default|primary|danger|success|warning
     * @param  string $type [description]
     * @return [type]       [description]
     */
    public function type($type = '')
    {
        if ($type) {
            $this->type=$type;
        }
        return $this->type;
    }
    
    /**
     * The box title
     * @param  string $title [description]
     * @return [type]        [description]
     */
    public function title($title = '')
    {
        if ($title) {
            $this->title=$title;
        }
        return $this->title;
    }
    
    /**
     * The 'small' title
     * @param  string $title [description]
     * @return [type]        [description]
     */
    public function small($str = '')
    {
        if ($str) {
            $this->small=$str;
        }
        return $this->small;
    }

    /**
     * Box icon class. Use font awesome names, ex: 'fa fa-user'
     * You can pass multiple icons in a array, ex: ['fa fa-user','fa fa-file']
     * @param  string $classname [description]
     * @return [type]            [description]
     */
    public function icon($classname = '')
    {
        if ($classname) {
            $this->icon=$classname;
        }
        return $this->icon;
    }

    /**
     * A target link on the icon
     * @param  string $url [description]
     * @return [type]      [description]
     */
    public function iconUrl($url = ''){
        if ($url) {
            $this->iconUrl=$url;
        }
        return $this->iconUrl;
    }

    /**
     * Color Used for the 'tiles'
     * @param  string $color [description]
     * @return [type]        [description]
     */
    public function color($color = '')
    {
        if ($color) {
            $this->color=$color;
        }
        return $this->color;
    }

    /**
     * The box id (html property)
     * @param  string $id [description]
     * @return [type]     [description]
     */
    public function id($id = '')
    {
        if ($id) {
            $this->id=$id;
        }
        return $this->id;
    }

    /**
     * Box html body
     * @param  string $body [description]
     * @return [type]       [description]
     */
    public function body($body = '')
    {
        if (is_array($body)) {
            $this->body=implode('', $body);
        } elseif ($body) {
            $this->body=$body;
        }
        return $this->body;
    }
    
    
    /**
     * Set the body padding (add the class 'no-padding to the box boddy')
     * Padding is set (true) by default
     * @param  boolean $padding [description]
     * @return [type]           [description]
     */
    public function body_padding($padding = true)
    {
        if ($padding == false) {
            $this->body_padding=$padding;
        }
        return $this->body_padding;
    }


    /**
     * Box html footer
     * @param  string $footer [description]
     * @return [type]         [description]
     */
    public function footer($footer = '')
    {
        if ($footer) {
            $this->footer=$footer;
        }
        return $this->footer;
    }

    /**
     * When set to true, the box show a overlay and a loading image
     * You can hide it with $('#boxid .overlay, #boxid.loading-img').hide()
     * @param  boolean $loading [description]
     * @return boolean
     */
    public function loading($loading = false)
    {
        if ($loading) {
            $this->loading=$loading;
        }
        return $this->loading;
    }


    public function collapsable($collapsable = false)
    {
        if ($collapsable) {
            $this->collapsable=$collapsable;
        }
        return $this->collapsable;
    }

    
    public function collapsed($collapsed = false)
    {
        if ($collapsed) {
            $this->collapsable=true;
            $this->collapsed=true;
        }
        return $this->collapsed;
    }

    
    public function boxTools($htm = '')
    {
        if ($htm) {
            $this->boxTools=$htm;
        }
        return $this->boxTools;
    }
    
    

    /**
     * Add a top-right "x" button that allow box desctruction
     * @param  boolean $removable [description]
     * @return [type]             [description]
     */
    public function removable($removable = false)
    {
        if ($removable) {
            $this->removable=$removable;
        }
        return $this->removable;
    }

    public function addClass($str = '')
    {
        if ($str) {
            $this->class=$str;
        }
        return $this->class;
    }

    public function style($style = '')
    {
        if ($style) {
            $this->style=$style;
        }
        return $this->style;
    }


    /**
     * Return the LTE Box as html
     * @return [type] [description]
     */
    public function html($body = '',$footer = '')
    {

        if ($body) {
            $this->body($body);
        }

        if ($footer) {
            $this->footer($footer);
        }

        $STYLE='';
        if ($this->style()) {
            $STYLE="style='".$this->style()."'";
        }

        $HTML=[];
        
        $class=[];
        $class[]='box';
        $class[]='box-'.$this->type();
        if($this->collapsed)$class[]='collapsed-box';
        if($this->addClass())$class[]=$this->addClass();
        
        $HTML[]='<div class="'.implode(" ",$class).'" '.$STYLE.' id="'.$this->id().'">';// box-solid

        // box header
        $HTML[]='<div class="box-header">';
        
        if ($this->title) {
            $HTML[]='<h3 class="box-title">';
            
            if ($this->icon()) {
                if (is_array($this->icon())) {
                    foreach ($this->icon() as $ico) {
                        $HTML[]="<i class='".$ico."'></i> ";
                    }
                } else {
                    $HTML[]="<i class='".$this->icon()."'></i> ";
                }
                //
                //$HTML[]="<i class='fa fa-arrow-right'></i> ";
                //$HTML[]="<i class='fa fa-book'></i> ";
            }
            $HTML[]=$this->title;
            if($this->small()){
                $HTML[]=' <small>'.$this->small().'</small>';
            }
            $HTML[]='</h3>';
        }
        
        // pull-right box-tools
        $HTML[]='<div class="pull-right box-tools">';
        
        if($this->boxTools()){
            $HTML[]=$this->boxTools();
        }

        // reload
        //$HTML[]='<button class="btn btn-'.$type.' btn-sm refresh-btn" data-toggle="tooltip" title="" data-original-title="Reload"><i class="fa fa-refresh"></i></button>';
        
        
        if($this->collapsable()){
            if($this->collapsed()){
                $class="fa fa-plus";
            }else{
                $class="fa fa-minus";
            }
            $HTML[]='<button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="" data-original-title="Collapse"><i class="'.$class.'"></i></button>';
        }
        
        // remove
        if ($this->removable()) {
            $HTML[]='<button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="" data-original-title="Remove"><i class="fa fa-times"></i></button>';
        }

        $HTML[]='</div>';
    
        $HTML[]='</div>';
        
        
        // body
        $class=$style=[];
        $class[]='box-body';
        if($this->collapsed()){
            $class[]='collapsed-box';
            $style[]='display:none;';
        }
        
        if(!$this->body_padding()){
            $class[]='no-padding';
        }

        $HTML[]="<div class='".implode(' ',$class)."' style='".implode('',$style)."'>";

        
        if (is_array($this->body)) {
            $HTML[]=implode('', $this->body);
        } else {
            $HTML[]=$this->body;
        }
        
        $HTML[]='</div>';// body end

        // footer
        if ($this->footer()) {
            
            if ($this->collapsed()) {
            //if (false) {
                $HTML[]="<div class='box-footer collapsed-box' style='display:none;'>";// $collapse
            } else {
                $HTML[]="<div class='box-footer'>";// $collapse
            }
            
            
            if (is_array($this->footer())) {
                $HTML[]=implode('', $this->footer());
            } else {
                $HTML[]=$this->footer();
            }
            $HTML[]='</div>';
        }

        
        if ($this->loading()) {
            $HTML[]='<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>';
        }else{
            $HTML[]='<div class="overlay" style="display:none"><i class="fa fa-refresh fa-spin"></i></div>';
        }

        // end
        $HTML[]='</div>';// /.box -->

        return implode("", $HTML);
    }
    
    public function __toString()
    {
        return $this->html();
    }
}
