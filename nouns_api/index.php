<?php
//blame all of this on http://code.tutsplus.com/tutorials/creating-an-api-centric-web-application--net-23417
define('DATA_PATH', realpath(dirname(__FILE__).'/data'));

//include our models
include_once 'models/Animal.php';

try {
    $params = $_REQUEST;

    $controller = empty( $params['want'] )
        ? 'Animals'
        : ucfirst( strtolower( addslashes( $params['want'] ) ) );

    $action = empty( $params['action'] )
        ? 'readAction'
        : strtolower( $params['action'] ).'Action';

    //check if the controller exists. if not, throw an exception
    if( file_exists( "controllers/{$controller}.php" ) ) {
        include_once "controllers/{$controller}.php";
    } else {
        throw new Exception( 'Controller is invalid.' );
    }

    $controller = new $controller( $params );

    //check if the action exists in the controller. if not, throw an exception.
    if( method_exists( $controller, $action ) === false ) {
        throw new Exception( 'Action is invalid.' );
    }

    //execute the action
    $result['success'] = true;
    $result['animals'] = $controller->$action();

} catch( Exception $e ) {
    //catch any exceptions and report the problem
    $result = array();
    $result['success'] = false;
    $result['errormsg'] = $e->getMessage();
}

//echo the result of the API call
echo json_encode($result);
exit();
