<?php
define('EOTW_USER_ROUTE_ALL', "GET /eotwusers");
define('EOTW_USER_ROUTE_GETTOKEN', "POST /eotwusers/gentoken");
define('EOTW_USERGROUP', '6');
define('EOTW_GROUP', '4');


Flight::route(EOTW_USER_ROUTE_GETTOKEN, function(){
    Flight::setCrossDomainHeaders();
    TNDB::init();//always.
    $data = FlightHelper::getData();//data

    $ok = true;
    $token ="";
    $userdata = array();
    $message = "";

    if($data["_id"] != "" && $data["first_name"] != ""){

        $hasUser  = TNDB::$ctx->has("nms_social_user",[
            "_id"=>$data["_id"]
            ]);    

        if($hasUser){
            $message = "Updated and retrived";

            TNDB::$ctx->update("nms_social_user",[
                "first_name"=>$data["first_name"]
                ,"last_name"=>$data["last_name"]
                ,"email"=>$data["email"]
            ],[
                "_id"=>$data["_id"]
            ]);

        }else{
            $message = "Inserted and retrived";
            TNDB::$ctx->insert("nms_social_user",[
                "_id"=>$data["_id"]
                ,"first_name"=>$data["first_name"]
                ,"last_name"=>$data["last_name"]
                ,"email"=>$data["email"]
                ,"_usergroup_id" => EOTW_USERGROUP
            ]);    
        }

        $user = Flight::EOTW_GET_USER($data["_id"]);

        $token = base64_encode(json_encode(array("_social_user_id"=>$data["_id"]))) . "WFsX3VzZXJ";
        $tokenDecode = json_decode(base64_decode(substr($token, 0,strlen($token)-10)));

    }else{
        $ok = false;
        $message = "_id | first_name required";
    }

    

    $res = array(
            "ok" => $ok,
            "token" => $token,
            "data" => $user,
            "message" => $message
        );

    Flight::jsoncallback($res);
});

Flight::map("EOTW_GET_USER",function($_id){
    $cols = "usr._id";
    $cols = $cols. ","."usr.first_name";
    $cols = $cols. ","."usr.last_name";
    $cols = $cols. ","."ifnull(usrstats.clicks,0) as clicks";
    $sql = "SELECT ".$cols." FROM nms_social_user usr";
    $sql = $sql . " LEFT JOIN nms_social_user_stats usrstats on usrstats._social_user_id = usr._id";
    $sql = $sql . " WHERE usr._id = %i_social_user_id AND usr._usergroup_id = %i_usergroup_id";    
    $rta = DB::query($sql,array(
        "social_user_id" => $_id
        ,"usergroup_id" => EOTW_USERGROUP
        ));
    return $rta;
});

Flight::route(EOTW_USER_ROUTE_ALL, function(){
    Flight::setCrossDomainHeaders();
	TNDB::init();//always.

    $cols = "usr._id";
    $cols = $cols. ","."usr.first_name";
    $cols = $cols. ","."usr.last_name";
    $cols = $cols. ","."ifnull(usrstats.clicks,0) as clicks";
    
    $sql = "SELECT ".$cols." FROM nms_social_user usr";
    //$sql = $sql . " INNER JOIN nms_usergroup usrgrp on usrgrp._id = usr._usergroup_id";
    //$sql = $sql . " INNER JOIN nms_usergroup_group usrgrpgrp on usrgrpgrp._usergroup_id = usrgrp._id and usrgrpgrp._group_id = %i_group_id";

    $sql = $sql . " LEFT JOIN nms_social_user_stats usrstats on usrstats._social_user_id = usr._id";
    $sql = $sql . " WHERE usr._usergroup_id = %i_usergroup_id";
    
    
    $rta = DB::query($sql,array(
        "usergroup_id" => EOTW_USERGROUP
        ));

    Flight::jsoncallback($rta);
});

?>