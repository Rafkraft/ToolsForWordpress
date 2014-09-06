<?php

//check if request comes from the server
if($_SERVER['REMOTE_ADDR'] != $_SERVER['SERVER_ADDR']){
    die('Not Allowed');
}

// Get data and updata data.json
$data = $_POST['data'];
file_put_contents('data.json', $data);
echo 'done';

?>