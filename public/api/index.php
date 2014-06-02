<?php
require 'db/medoo.min.php';  //DB MEEDODB
require 'db/meekrodb.2.2.class.php'; //MEEKRODB
require 'db/tndb.php';        //DB INIT CONFIG


require 'flight/Flight.php';  //ROUTES

require 'routes/eotw_users.php';    //ROUTES


Flight::map("setCrossDomainHeaders",function(){
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
});

Flight::map("callback",function($data){
  //echo $_GET['callback'].'(' . $data . ');';
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  echo $data;
  exit;
});

Flight::map("jsoncallback",function($data){
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  echo json_encode($data);
  exit;
});

Flight::route("OPTIONS *",function(){
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
});

Flight::route("OPTIONS /*/*",function(){
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
});


//--------------------------------------------------
Flight::map('error', function(Exception $ex){
    // Handle error
    echo $ex->getTraceAsString();
});
Flight::set('flight.log_errors', true);

Flight::map('notFound', function(){
    Flight::setCrossDomainHeaders();
    echo "Route not found, sorry pal.";
});

Flight::route('/', function(){
    header("Access-Control-Allow-Origin: *");
    echo "ENDOFTHEWORLD API OK";
});

Flight::start();
?>
