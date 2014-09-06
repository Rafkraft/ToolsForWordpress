<?php

//check if request comes from the server
if($_SERVER['REMOTE_ADDR'] != $_SERVER['SERVER_ADDR']){
    die('Not Allowed');
}

//Add your channels and the matching IDs in this object
$config = Array(
                "0" => Array("The Ski Channel","UCP6phaWNUbfF2MlbEtYH7SQ"),
                "1" => Array("Snowboard XTreme Channel","UCIjBZPxYCU0dQmXJuwEl8gw")
                );

//Your youtube API key
$youtubeApiKey = "AIzaSyAFyoB7-GEcQQKoXWTlWy8gRoKDMMwbHQc";


// Get data.json and serialize
//echo ini_get('allow_url_fopen');
$url = "data.json";
$dataString = file_get_contents($url);
$dataArray  = json_decode($dataString, true);





foreach ($config as $key => $value){
    scan($dataArray,$value[0],$value[1],$youtubeApiKey);
};


function scan($dataArray,$channelName,$channelId,$youtubeApiKey){
    $APIurl = "https://www.googleapis.com/youtube/v3/search?key=".$youtubeApiKey."&channelId=".$channelId."&part=snippet,id&order=date&maxResults=6";

    // Get videos from Youtube
    $videos = file_get_contents($APIurl);
    $array =  json_decode($videos, true);
    $items = $array["items"];
    $number=0;

    echo "<div>";

    echo $channelName;
    echo '<br>';

    foreach ($items as $key => $value){
        $video = $value;
        $videoId=$value['id']['videoId'];
        $found = FALSE;
        
        foreach ($dataArray as $key => $value){
            if ($videoId===$value['videoId']){
                $found = TRUE;
                
            }
        }
        if(!$found){
            $number++;
            
            add($video,$channelName);
        }
        
    };
    echo $number." added"."<br>";
    echo "</div>";
}
function add($itemObject,$channelName){

    $url = "data.json";
    $dataString = file_get_contents($url);
    $dataArray  = json_decode($dataString, true);

    //set variables
    $id = strval(count($dataArray));
    $nom = array(
                $channelName
            );
    $titre = $itemObject['snippet']['title'];
    $type = 'actu';
    $tags = array();
    $langue = 'fr';
    $date_parution = $itemObject['snippet']['publishedAt'];
    $date_parution = split('-', $date_parution);
    $date_parution = substr($date_parution[2],0,2).'/'.$date_parution[1].'/'.$date_parution[0];

    $today = getdate();$s = $today['seconds'];$mi = $today['minutes'];$h = $today['hours'];$d = $today['mday'];$mo = $today['mon'];$y = $today['year'];
    $mo = (string)$mo;if(strlen($mo)===1){$mo = '0'.$mo;};
    $d = (string)$d;if(strlen($d)===1){$d = '0'.$d;};
    $date_upload = $d.'/'.$mo.'/'.$y;

    $videoId = $itemObject['id']['videoId'];
    $parts = array(
                $itemObject['id']['videoId']
            );
    $plateforme ="youtube";
    $big="false";
    $img=$itemObject['snippet']['thumbnails']['medium']['url'];

    //set array
    $array = array(
        'id'=>$id,
        'nom' => $nom,
        'titre' => $titre,
        'type' => $type,
        'tags' => $tags,
        'langue' => $langue,
        'date_parution' => $date_parution,
        'date_upload' => $date_upload,
        'videoId' => $videoId,
        'parts' => $parts,
        'plateforme' => $plateforme,
        'big'=>$big,
        'img'=>$img
    );


    //echo '________';
    //print_r($array);
    //echo '________';

    array_push($dataArray, $array);
    $myJSON = json_encode($dataArray);
    file_put_contents($url, $myJSON);


}
?>
<style>
div {
    margin: 10px;
    padding:10px;
    border:1px solid #6AD;
    background-color: #9CF;
}
</style>