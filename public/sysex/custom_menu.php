<?php
function customMenu()
{
    $htm = [];
    //$htm[]=__FUNCTION__."()";
    $htm[] = '<ul class="nav navbar-nav">';


    $htm[] = '<li class="dropdown user user-menu">';
    $htm[] = '<a href="#" class="dropdown-toggle" data-toggle="dropdown">';

    $htm[] = '<i class="fa fa-sign-in"></i>';
    $htm[] = '<span class="hidden-xs">Inputs</span>';
    $htm[] = '</a>';
    $htm[] = '<ul class="dropdown-menu">';

    //<!-- User image -->
    $htm[] = '<li class="user-header">';
    //$htm[]='<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">';
    $htm[] = '<p>';
    $htm[] = 'HELLO';
    $htm[] = '<small>Joined : </small>';
    $htm[] = '</p>';
    //$htm[]="<pre>".print_r($user,true)."</pre>";
    $htm[] = '</li>';

    //<!-- Menu Footer-->
    $htm[] = '<li class="user-footer">';
    //$htm[]='<div class="pull-left"><a href="#" class="btn btn-default btn-flat">Profile</a></div>';
    $htm[] = '<div class="pull-right"><a href="../login/logout.php" class="btn btn-default btn-flat"><i class="fa fa-sign-out"></i> Sign out</a></div>';
    $htm[] = '</li>';
    $htm[] = '</ul>';
    $htm[] = '</li>';

    // LOG OUT //
    // LOG OUT //
    // LOG OUT //
    // LOG OUT //

    $htm[] = '<li title="Logout">';
    $htm[] = '<a href="../login/logout.php" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i> Outputs</a>';
    $htm[] = '</li>';

    $htm[] = '</ul>';

    return implode('', $htm);
}
$admin->navbarCustomMenu(customMenu());