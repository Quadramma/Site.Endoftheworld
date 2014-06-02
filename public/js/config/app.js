//GLOBAL
//sharedScopes = {};
//var _nms = {};smokesignals.convert(_nms);

//------------------------------
var app = angular.module("QJarvisApp", [
    //ANGULAR LIBS
    //COMMON
    "appRoutes",
    //QJarvis ================================================
    "AppModule"
]);


//CORS----------------------
app.config(['$httpProvider', '$sceDelegateProvider',
    function($httpProvider, $sceDelegateProvider) {
        $httpProvider.defaults.useXDomain = true;
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?quadramma.com/]);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

