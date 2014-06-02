appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

    .state('layout', {
        url: '/layout',
        views: {
            '': {
                templateUrl: 'views/layout.html'
            },
            'modals@layout': {
                templateUrl: 'views/modals.html'
            }
        }
    })

    .state('layout.home', {
        url: '^/home',
        views: {
            '': {
                templateUrl: 'views/home.html',
                controller: "HomeController"
            }
        }
    })

    .state('layout.login', {
        url: '^/login',
        views: {
            '': {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            },
            "logo@login": {
                templateUrl: 'views/logo.html'
            }
        }
    })

});