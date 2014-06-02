angular.module('QJConfigModule', []).factory('$QJConfig', [

    function() {
        return {
            AppIdentifier: "AppIdentifier_NAME",
            apiPath: "localhost/eotw/api/"
            //,apiPath : "http://www.quadramma.com/pruebas/qjarvis/api/"    
        }
    }
]);