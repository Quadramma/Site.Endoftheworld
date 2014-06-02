angular.module('AppModule', ["EOTWApiService", "QJSocialModule", "LoginModule"]).controller('PageController', function($timeout, $QJAuth, $QJSocial, $scope, $QJConfig, $rootScope, $state) {
    console.info("[PageController]");
    $rootScope.social = $QJSocial;
    $QJSocial.onStatusChange(function(response) {
        console.log('onStatusChange');
        console.log(response);
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            //testAPI();
            console.info("Logged into your app and Facebook.");
            $QJAuth.setLogged(true, "token!$$$$");
            FB.api('/me', function(response) {
                console.log(response);
                console.log('Successful login for: ' + response.name);
                console.info('Thanks for logging in, ' + response.name + '!');
            });
            $timeout(function() {
                $state.go("layout.home");
            });
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.info('Please log ' + 'into this app.');
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            console.info('Please log ' + 'into Facebook.');
        };
    })
    $QJSocial.init({
        appId: '1460923364149280'
    });
    $(".ng-scope").css("max-height", $("window").height());
    $(".ng-scope").css("overflow-y", "auto");
    $QJConfig.AppIdentifier = "End of The World";
}).controller('MenuController', function($scope, $QJConfig, $rootScope) {
    console.info("[MenuController]");
    $scope.closeMenu = function() {
        $('.menu.sidebar').sidebar('toggle');
    }
}).controller('HeaderController', function($scope, $rootScope) {
    console.info("[HeaderController]");

    function initSidebar() {
        $('.menu.sidebar').sidebar({
            overlay: ($(window).width() < 1200)
        });
    }
    initSidebar();
    $(window).on("resize", function() {
        if ($('.menu.sidebar').sidebar("is open")) {
            $('.menu.sidebar').sidebar("hide");
        }
        initSidebar();
    })
    $scope.clickMenuButton = function() {
        $('.menu.sidebar').sidebar('toggle');
    }
    if ($(window).width() > 1200) {
        //setTimeout(function() {
        $('.menu.sidebar').sidebar('toggle');
        //}, 3000);
    }
    if (!$rootScope.logged) {
        $(".menu.button").toggle(false);
    }
}).controller('HomeController', function($scope, $rootScope, $QJLocalSession) {
    console.info("[HomeController]");
    $scope.session = $QJLocalSession.getData();
    if ($rootScope.logged) {
        $(".menu.button").fadeIn();
    }
});