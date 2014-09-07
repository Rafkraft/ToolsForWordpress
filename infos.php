<?php

include "index.php";


echo 'lol';

echo "<div id='infos'>";
$array = array(
            "userLogged"=>is_user_logged_in(),
            "userLogin"=>$current_user->user_login,
            "logOutUrl"=>wp_logout_url(),
            'mail' => $current_user->user_email,
            'ID' =>$current_user->ID,
            );

 $JSON = json_encode($array);
 echo $JSON;

 echo "</div>";

?>