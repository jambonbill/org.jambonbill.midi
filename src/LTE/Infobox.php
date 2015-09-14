<?php
/**
 * A number of helper to build nice widgets for adminlte2
 * @author jambonbill
 */
namespace LTE;


/**
 * http://almsaeedstudio.com/AdminLTE/pages/widgets.html
 * <div class="info-box">
 *   <span class="info-box-icon bg-green"><i class="fa fa-flag-o"></i></span>
 *   <div class="info-box-content">
 *     <span class="info-box-text">Bookmarks</span>
 *     <span class="info-box-number">410</span>
 *   </div><!-- /.info-box-content -->
 * </div><!-- /.info-box -->           
 */

class Infobox
{
    private $id='';
    private $class='info-box';//default, change to 'info-box bg-aqua' for a colored bg box
    private $color='';
    
    private $content='';//if set, content override ttitle and value
    private $title='box-title';
    private $value='';
    private $icon='';
    private $description='';
    private $progressValue='';
    
    
    public function __construct ()
    {
        $this->id = md5(rand(0, time()));
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

    public function classname($str = '')
    {
        if ($str) {
            $this->class=$str;
        }
        return $this->class;
    }

    public function content($str = '')
    {
        if ($str) {
            $this->content=$str;
        }
        return $this->content;
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
  
    public function value($str = '')
    {
        if ($str) {
            $this->value=$str;
        }
        return $this->value;
    }

    public function progressValue($str = '')
    {
        if ($str) {
            $this->progressValue=$str;
        }
        return $this->progressValue;
    }

    public function description($str = '')
    {
        if ($str) {
            $this->description=$str;
        }
        return $this->description;
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
     * Return the LTE Box as html
     * @return [type] [description]
     */
    public function html()
    {
        $HTML=[];
        $HTML[]='<div class="'.$this->class.'">';
        $HTML[]='<span class="info-box-icon bg-'.$this->color().'"><i class="'.$this->icon().'"></i></span>';
        
        $HTML[]='<div class="info-box-content">';
        if($this->content()){
            $HTML[]=$this->content();
        }else{
            $HTML[]='<span class="info-box-text">'.$this->title().'</span>';
            $HTML[]='<span class="info-box-number">'.$this->value().'</span>';
            
            if($this->progressValue())$HTML[]='<div class="progress"><div class="progress-bar" style="width: '.$this->progressValue().'%"></div></div>';
            if($this->description())$HTML[]='<span class="progress-description">'.$this->description().'</span>';

        }
        $HTML[]='</div>';//<!-- /.info-box-content -->';    
        
        $HTML[]='</div>';//<!-- /.info-box -->     

        return implode("", $HTML);
    }
    
    public function __toString()
    {
        return $this->html();
    }
}
