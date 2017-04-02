<?php
/**
 * This is a php class version of AdminLTE2 for quick integration
 * no hard coded path, no db dependency, or session tricks
 * configuration done through json
 * @author jambonbill
 * @version 1.01
 */
namespace LTE;

/**
* @brief Class providing adminlte2 skeleton
*/
class AdminLte2
{

    /**
     * Static path to assets
     * @var string
     */
    private $path='';// static path
    private $config=[];//admin config from json file
    private $_menu;//left menu data
    private $title= 'title';// document title
    private $lang= 'en';//$_SERVER['HTTP_ACCEPT_LANGUAGE']

    private $navbarCustomMenu='';//html
    private $userPanel='';//html
    private $DEBUG=false;

    /**
     * AdminLte Constructor
     * @param boolean $private [description]
     */
    public function __construct()
    {
        // get the config file. it must be located next to the class
        $configjson=__DIR__."/config.json";

        if(is_file($configjson)){
            $string = file_get_contents($configjson);
            $this->config=json_decode($string);
            $err=json_last_error();
            if($err){
                die("Error: Invalid config.json");
            }else{
                //find the correct path for assets
                $diff=count(explode("/",realpath('.')))-count(explode("/",realpath(__DIR__."/../../web")));
                //echo "diff=$diff\n";
                $this->path=str_repeat("../", $diff);
            }
            
            if (is_object($this->config->menu)) {
                $this->_menu=$this->$this->config->menu;
            } else if ($this->config->menu&&is_file(__DIR__.'/'.$this->config->menu)) {

                $content=file_get_contents(__DIR__.'/'.$this->config->menu);
                $this->_menu=json_decode($content);
                if ($err=json_last_error()) {
                    die("error $err".json_last_error_msg()."<br>$content");
                }

            } else {
                die($this->config->menu . " not found");
            }

        }else{
            throw new \Exception("Error : config.json file not found in ".realpath("."), 1);
        }


        $this->lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);// set language
        if($this->lang!='fr')$this->lang='en';
    }

    /**
     * Get/Set config
     * @param  array  $config [description]
     * @return [type]         [description]
     */
    public function config($config=[])
    {
        if($config){
            $this->config=$config;
        }
        return $this->config;
    }


    /**
     * Return detected language
     * @return [type] [description]
     */
    public function lang()
    {
        return $this->lang;
    }


    /**
     * Set page title
     * @param  string $title [description]
     * @return [type]        [description]
     */
    public function title($title = '')
    {
        $this->title = $title;
        return $this->title;
    }

    /**
     * return the admin html
     * @return string html
     */
    public function html()
    {
        $html=[];
        $html[]=$this->head();
        $html[]=$this->body();
        $html[]=$this->header();
        $html[]=$this->leftside();
        $html[]=$this->scripts();
        $html[]='<aside class="right-side">';
        return implode("",$html);
    }

    public function __toString()
    {
        return $this->html();
    }

    /**
     * head
     * bring the headers, and initial assets
     * @return [type] [description]
     */
    public function head()
    {
        $HTML=[];
        $HTML[]='<!DOCTYPE html>';
        $HTML[]='<html lang="'.$this->lang().'">';
        $HTML[]='<head>';
        $HTML[]='<meta charset="UTF-8">';

        if (isset($this->config->meta)&&is_array($this->config->meta)) {
            foreach($this->config->meta as $meta){
                $values=[];
                foreach($meta as $k=>$v) {
                    $values[]=$k.'="'.$v.'"';
                }
                $HTML[]="<meta ".implode(' ',$values).">";
            }
        }

        $HTML[]="<title>".$this->title."</title>";
        $HTML[]="<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>";

        if($this->config->favicon && is_file($this->path.$this->config->favicon)){
            $HTML[]='<link id="favicon" rel="shortcut icon" href="'.$this->path.$this->config->favicon.'">';
        }

        // Css
        if(isset($this->config->css)){
            foreach ($this->config->css as $v) {
                if(preg_match("/^http/i",$v)){
                    $HTML[]='<link href="'.$v.'" rel="stylesheet" type="text/css" />';
                }else{
                    $HTML[]='<link href="'.$this->path.$v.'" rel="stylesheet" type="text/css" />';
                }
            }
        }
        $HTML[]="</head>";
        return implode("\n", $HTML);
    }


    /**
     * GET/SET config meta's
     * @return [type] [description]
     */
    public function meta($meta=[])
    {
        if (isset($meta)&&is_array($meta)) {
            $this->config->meta=$meta;
        }
        return $this->config->meta;
    }


    /**
     * body
     * bring the headers, and initial assets
     * @return [type] [description]
     */
    public function body()
    {
        $HTML=[];
        $class=[];
        //$class[]='skin-blue';
        if($this->config()->layout->skin)$class[]=$this->config()->layout->skin;
        else $class[]='skin-blue';

        if($this->config()->layout->fixed)$class[]='fixed';
        if($this->config()->layout->{'sidebar-collapse'})$class[]='sidebar-collapse';
        if($this->config()->layout->{'layout-boxed'})$class[]='layout-boxed';

        $HTML[]="<body class='".implode(" ",$class)."'>";
        $HTML[]='<div class="wrapper">';
        return implode("\n", $HTML);
    }


    /**
     * header
     * this is NOT the html header, but the ADMIN header (top bar)
     * @return [type] [description]
     */
    public function header()
    {
        $HTML=[];
        //$HTML[]=__FUNCTION__."()";

        // header logo: style can be found in header.less -->
        $HTML[]='<header class="main-header">';


        $title="Admin";
        if (isset($this->config->title)) {
            $title=$this->config->title;
        }

        //$HTML[]='<a href="?" class="logo">';
        if(isset($this->config->homeurl))$homeurl=$this->path.$this->config->homeurl;
        else $homeurl='#';
        $HTML[]="<a href='$homeurl' class=logo>$title</a>";
        //$HTML[]='</a>';

        // Header Navbar: style can be found in header.less -->
        $HTML[]='<nav class="navbar navbar-static-top" role="navigation">';

        // Sidebar toggle button
        $HTML[]='<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">';
        $HTML[]='<span class="sr-only">Toggle navigation</span>';
        $HTML[]='</a>';

        // Navbar right menu
        $HTML[]='<div class="navbar-custom-menu">';
        //$HTML[]='navbar-custom-menu';
        $HTML[]=$this->navbarCustomMenu;
        $HTML[]='</div>';


        $HTML[]='</nav>';
        $HTML[]='</header>';

        return implode("\n", $HTML);
    }


    /**
     * Set top navbar html
     * Usefull for user messages
     * @param  string $htm [description]
     * @return [type]      [description]
     */
    public function navbarCustomMenu($htm = '')
    {
        if($htm&&is_array($htm)){
            $htm=implode('',$htm);
        }

        if($htm)$this->navbarCustomMenu=$htm;
        return $this->navbarCustomMenu;
    }


    /**
     * Get/Set the menu user panel (first thing to appear in the left menu)
     * @param  string $htm [description]
     * @return [type]      [description]
     */
    public function userPanel($htm = '')
    {
        if($htm&&is_array($htm)){
            $htm=implode('',$htm);
        }

        if($htm)$this->userPanel=$htm;
        return $this->userPanel;
    }




    /**
     * left side
     */
    public function leftside()
    {
        $HTML=[];
        $HTML[]='<div class="wrapper row-offcanvas row-offcanvas-left">';
        //$HTML[]='<aside class="left-side sidebar-offcanvas">';//old
        $HTML[]='<aside class="main-sidebar">';//new
        // sidebar: style can be found in sidebar.less -->
        $HTML[]='<section class="sidebar">';

        // Sidebar user panel -->
        $HTML[]=$this->userPanel();


        // search field /
        if(isset($this->config->menusearch) && $this->config->menusearch){
            $HTML[]='<div class="sidebar-form input-group">';
            $HTML[]='<input type="text" id="q" name="q" class="form-control" placeholder="Search ...">';
            $HTML[]='<span class="input-group-btn">';
            $HTML[]='<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>';
            $HTML[]='</span>';
            $HTML[]='</div>';
        }

        // sidebar menu: : style can be found in sidebar.less -->
        //$HTML[]= $this->menu();
        $HTML[]= $this->menuHtml();

        $HTML[]='</section>';
        $HTML[]='</aside>';
        return implode("\n", $HTML);
    }


    /**
     * Return left menu
     * @return string html
     */
    /*
    public function menu($json = '')
    {

        $menu=$this->config->menu;

        if(!isset($menu)){
            //throw new \Exception("Error : $this->config->menu must be a object", 1);
            return '';
        }

        if(!is_object($this->config->menu))
        {

            if ($this->config->menu&&is_file(__DIR__.'/'.$this->config->menu)) {

                $content=file_get_contents(__DIR__.'/'.$this->config->menu);
                $this->config->menu=json_decode($content);

                $err=json_last_error();

                if($err){
                    die("error $err".json_last_error_msg()."<br>$content");
                    //throw new \Exception("JSON Error $err", 1);
                }

            } else {
                die($this->config->menu . " not found");
                return '';
            }
        }else{

        }

        $HTML=[];
        $HTML[]='<ul class="sidebar-menu">';

        foreach(@$this->config->menu as $name=>$o){

            $title='';
            $class='';

            if(!$o)continue;
            if(isset($o->class))$class='class="'.$o->class.'"';
            if(isset($o->title))$title='title="'.$o->title.'"';
            if(isset($o->sub))
            {
                $HTML[]='<li class="treeview" '.$title.'>';
                //if(!isset($o->url))$o->url='#';
                if(!isset($o->icon))$o->icon='';
                $HTML[]='<a href="'.@$o->url.'">';
                $HTML[]='<i class="'.$o->icon.'"></i> <span>'.$o->text.'</span>';
                $HTML[]='<i class="fa fa-angle-left pull-right"></i>';
                $HTML[]='</a>';
                $HTML[]='<ul class="treeview-menu">';
                foreach($o->sub as $obj){
                    $HTML[]='<li>';
                    if(isset($obj->url))$HTML[]="<a href='".$this->path.$obj->url."'>";
                    if(isset($obj->icon))$HTML[]="<i class='".$obj->icon."'></i> ";
                    $HTML[]='<span>'.$obj->text.'</span></a>';
                    $HTML[]='</li>';
                }
                $HTML[]='</ul>';
                $HTML[]='</li>';
            }
            else
            {
                $HTML[]='<li '.$class.' '.$title.'>';
                if(isset($o->url))$HTML[]='<a href="'.$this->path.$o->url.'">';
                if(isset($o->icon))$HTML[]='<i class="'.$o->icon.'"></i> ';
                $HTML[]='<span>'.@$o->text.'</span>';
                //$HTML[]='<small class="label pull-right bg-green">new</small>';//small
                if(isset($o->url))$HTML[]='</a>';
                $HTML[]='</li>';
            }
        }
        $HTML[]='</ul>';
        return implode('', $HTML);
    }
    */
   
    /**
     * GET/SET left menu data
     * @param  string $json [description]
     * @return [type]       [description]
     */
    public function menuData($json='')
    {
        //echo __FUNCTION__."($json)";
        if(is_object($json)){
            $this->_menu=$json;
        }

        if($this->_menu){
            return $this->_menu;
        }
        return [];
    }


    /**
     * Return left menu html
     * @return string html
     */
    public function menuHtml()
    {

        //echo __FUNCTION__."()";
        //print_r($this->menuData());        exit;

        $HTML=[];
        $HTML[]='<ul class="sidebar-menu">';

        foreach($this->menuData() as $name=>$o){

            $title='';
            $class='';

            if(!$o)continue;
            if(isset($o->class))$class='class="'.$o->class.'"';
            if(isset($o->title))$title='title="'.$o->title.'"';
            if (isset($o->sub)) {
                $HTML[]='<li class="treeview" '.$title.'>';
                //if(!isset($o->url))$o->url='#';
                if(!isset($o->icon))$o->icon='';
                //if(preg_match("/^(http|ftp|#)/",$o->url)){
                $HTML[]='<a href="'.@$o->url.'">';
                $HTML[]='<i class="'.$o->icon.'"></i> <span>'.$o->text.'</span>';
                $HTML[]='<i class="fa fa-angle-left pull-right"></i>';
                $HTML[]='</a>';
                $HTML[]='<ul class="treeview-menu">';

                foreach($o->sub as $obj){

                    $HTML[]='<li>';

                    if(isset($obj->url)){
                        if(preg_match("/^(http|ftp|#)/",$obj->url)){
                            //echo "<li>".$obj->url;
                            $HTML[]="<a href='".$obj->url."'>";
                        } else {
                            //TODO : Auto Highlight
                            if (isset($obj->title)) {
                                $TITLE=$obj->title;
                            } else {
                                $TITLE=basename($obj->url);
                            }
                            $HTML[]='<a href="'.$this->path.$obj->url.'" title="'.$TITLE.'">';
                        }
                    }

                    if(isset($obj->icon))$HTML[]="<i class='".$obj->icon."'></i> ";
                    $HTML[]='<span>'.$obj->text.'</span></a>';
                    $HTML[]='</li>';
                }
                $HTML[]='</ul>';
                $HTML[]='</li>';
            } else {
                if(isset($o->id)){
                    $HTML[]='<li '.$class.' '.$title.' id="'.$o->id.'">';    
                }else{
                    $HTML[]='<li '.$class.' '.$title.'>';    
                }
                
                if(isset($o->url)){
                    if(preg_match("/^(http|ftp|#)/",$o->url)){
                        $HTML[]='<a href="'.$o->url.'">';
                    }else{
                        $HTML[]='<a href="'.$this->path.$o->url.'">';
                    }
                }
                if(isset($o->icon))$HTML[]='<i class="'.$o->icon.'"></i> ';
                $HTML[]='<span>'.@$o->text.'</span>';
                //$HTML[]='<small class="label pull-right bg-green">new</small>';//small
                if(isset($o->url))$HTML[]='</a>';
                $HTML[]='</li>';
            }
        }
        $HTML[]='</ul>';
        return implode('', $HTML);
    }


    /**
    * @brief the list of js scripts to be included
    * @returns html
    */
    public function scripts()
    {
        if(!isset($this->config->js)){
            return '';
        }

        $HTML=[];
        foreach ($this->config->js as $k => $js) {
            if (preg_match("/^http/", $js)) {
                $HTML[]='<script src="' . $js . '" type="text/javascript"></script>';
            } else {
                $HTML[]='<script src="' . $this->path . $js . '" type="text/javascript"></script>';
            }
        }
        return implode("\n", $HTML);
    }



    private $footer;
    /**
     * Define footer. The footer is displayed only when "end()" is called
     * @param  string $body [description]
     * @return [type]       [description]
     */
    public function footer($body='')
    {
        if ($body) {
            $HTML=[];
            $HTML[]='<footer class="main-footer">';
            //$HTML[]='<div class="pull-right hidden-xs">';
            //$HTML[]='<b>Version</b> 2.3.0';
            //$HTML[]='</div>';
            $HTML[]=$body;
            $HTML[]='</footer>';
            $this->footer=implode("\n",$HTML);
        }
        return $this->footer;
    }

    /**
     * Properly finish the html document and end the script
     * @return [type] [description]
     */
    public function end()
    {
        $HTML=[];
        $HTML[]="</aside>";// end aside class="right-side"
        $HTML[]=$this->footer();
        $HTML[]="</div>";
        $HTML[]="</body>";
        $HTML[]="</html>";
        echo implode("\n",$HTML);
        exit;
    }
}