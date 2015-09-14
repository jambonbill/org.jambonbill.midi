<?php
/**
 * AdminLte2 Modal
 * https://almsaeedstudio.com/themes/AdminLTE/pages/UI/modals.html
 * to pop the modal -> $("#modalwindow").modal(true);
 * to update the title -> $("#modalwindow .modal-title").html('html');
 * to update the body -> $("#modalwindow .modal-body").html('html');
 */

/*
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title">Modal Default</h4>
        </div>
        <div class="modal-body">
          <p>One fine body…</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
 */

namespace LTE;

Class Modal
{
    private $id ='myModal';
    private $type ='default';
    private $icon ='fa fa-times';
    private $title='';
    private $body ='';
    private $footer ='';

    public function __construct ($title = '', $body = '', $footer='')
    {
        if($title)$this->title($title);
        if($body)$this->body($body);
        if($footer)$this->footer($footer);        
    }

    public function id($str = ''){
        if ($str) {
          $this->id=$str;
        }
        return $this->id;
    }
    
    public function type($str = ''){
        if ($str) {
          $this->type=$str;
        }
        return $this->type;
    }
    
    public function title($str = ''){
        if ($str) {
          $this->title=$str;
        }
        return $this->title;
    }
    
    public function body($str = ''){
        if ($str) {
          $this->body=$str;
        }
        return $this->body;
    }
    
    public function footer($str = ''){
        if ($str) {
          $this->footer=$str;
        }
        return $this->footer;
    }
    
    public function icon($str = ''){
        if ($str) {
          $this->icon=$str;
        }
        return $this->icon;
    }

    public function html()
    {
        $HTML=[];
        
        $HTML[]='<div class="modal modal-'.$this->type().'" id="'.$this->id.'">';
        $HTML[]='<div class="modal-dialog">';
        $HTML[]='<div class="modal-content">';
        
        $HTML[]='<div class="modal-header">';
          $HTML[]='<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>';
          $HTML[]='<h4 class="modal-title">';
          if($this->icon)$HTML[]='<i class="'.$this->icon().'"></i> ';
          $HTML[]=$this->title().'</h4>';
        $HTML[]='</div>';
        
        $HTML[]='<div class="modal-body">'.$this->body().'</div>';
        
        $HTML[]='<div class="modal-footer">';
          //$HTML[]='<button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>';
          //$HTML[]='<button type="button" class="btn btn-primary">Save changes</button>';
          $HTML[]=$this->footer();
        $HTML[]='</div>';
        
        $HTML[]='</div>';//<!-- /.modal-content -->
        $HTML[]='</div>';//<!-- /.modal-dialog -->
        $HTML[]='</div>';//<!-- /.modal -->
        
        return implode('',$HTML);
    }

    public function __toString()
    {
        return $this->html();
    }
}