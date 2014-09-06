
<?php

//check if request comes from the server
if($_SERVER['REMOTE_ADDR'] != $_SERVER['SERVER_ADDR']){
    die('Not Allowed');
}


$thumb =  $_POST['thumb'];
$itemId =  $_POST['id'];
$page_app = $_POST['page'];



include "../../../index.php";

global $current_user;


//Vérifier que l'utilisateur est connecté
if ( is_user_logged_in() ) {
    echo "l'utilisateur est connecté"."<br>";
    get_currentuserinfo();

    $url = "thumbsList.json";

    echo 'MMMMM'.$url.'MMMMMMMM';

    $user = $current_user->user_login;
    $string = file_get_contents($url);
    $json_array  = json_decode($string, true);

    echo $user ;

    if( array_key_exists ($itemId,$json_array) ){
        echo 'la clé existe';
        $first = true;
        foreach ($json_array[$itemId] as $key => $value) {
            if($value['author'] == $user){
                $json_array[$itemId][$key]['thumbs'] = $thumb;
                $first = false;
                echo 'valeur changée'.$json_array[$itemId][$key]['thumbs'];
            }
        }
        if($first){
            $new = array(
                    "author"=>$user,
                    "thumbs"=>$thumb
                    );
            array_push ($json_array[$itemId],$new);
            echo 'nouveau tableau dans id';
        }
    }else{
        $json_array[$itemId]=array();
        echo 'tableau créé';

        $new = array(
                "author"=>$user,
                "thumbs"=>$thumb
                );
        array_push ($json_array[$itemId],$new);
    }
    

    $valid = true;
    
    // écrire si $valid=true
    if ($valid){
        $myJSON = json_encode($json_array);
        file_put_contents($url, $myJSON);
        echo 'le fichier a été mis à jour';
    }

}else {
    echo "<p class='error'>"."Il faut être connecté pour plussoyer / moinsoyer"."</p>";
}



?>