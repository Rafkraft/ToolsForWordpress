<?php

//check if request comes from the server
if($_SERVER['REMOTE_ADDR'] != $_SERVER['SERVER_ADDR']){
    die('Not Allowed');
}

$itemId = $_POST['id'];
echo $id;
echo'<br>';

$userComment = $_POST['comment'];
echo $comment;
echo'<br>';

$date =  $_POST['date'];
echo $date;
echo'<br>';

$page_app = $_POST['page'];
echo 'mmmmmmmm'.$page_app.'mmmmmmmmmm';

$d = getdate ();

$today = getdate();
$s = $today['seconds'];
$mi = $today['minutes'];
$h = $today['hours'];
$d = $today['mday'];
$mo = $today['mon'];
$y = $today['year'];

$compteur = $y*10000000000+$mo*100000000+$d*1000000+$h*3600+$mi*60+$s;

echo 'br';
echo 'compteur'.$compteur;
echo 'br';

$s = (string)$s;
if(strlen($s)===1){
    $s = '0'.$s;
}
$mi = (string)$mi;
if(strlen($mi)===1){
    $mi = '0'.$mi;
}
$h = (string)$h;
if(strlen($h)===1){
    $h = '0'.$h;
}
$d = (string)$d;
if(strlen($d)===1){
    $d = '0'.$d;
}
$mo = (string)$mo;
if(strlen($mo)===1){
    $mo = '0'.$mo;
}

$date = $d.'/'.$mo.'/'.$y.' à '.$h.'h'.$mi;
echo '____'.$date;


include "../../../index.php";


global $current_user;

//Vérifier que l'utilisateur est connecté
if ( is_user_logged_in() ) {
    echo "l'utilisateur est connecté"."<br>";
    get_currentuserinfo();

    $url = $itemId.".json";
    echo'uuuuuuuuuuu_______'.$url.'_______uuuuuuuuuu';
    //Vérifier que le fichier existe, sinon le créer
    $empty = '[]';
    if (file_exists($url)) {
        echo 'le fichier existe'.'<br>';
    }else{
        echo 'le fichier a été créé'.'<br>';
        file_put_contents($url,$empty);
    }

    $user = $current_user->user_login;
    $string = file_get_contents($url);
    $json_array  = json_decode($string, true);

    $length  = count($json_array);
    $data = array(
        'id'=>$length,
        'author' => $user,
        'date' => $date,
        'compteur' => $compteur,
        'content' => $userComment
        );

    $valid = true;
    //vérifier que pas de post récent
    foreach( $json_array as $key => $value ) {
        if($json_array[$key]['author'] === $user){
            if( $json_array[$key]['compteur']+ 60 > $compteur){
                echo "<p class='error'>"."Merci de patienter au moins 60 secondes entre chaque commentaire"."</p>";
                $valid = false;
            }
        }
    }
    // écrire si pas de post récent
    if ($valid){
        array_push($json_array, $data);
        $myJSON = json_encode($json_array);
        file_put_contents($url, $myJSON);
    }

}else {
    echo "<p class='error'>"."Il faut être connecté pour commenter"."</p>";
}



?>