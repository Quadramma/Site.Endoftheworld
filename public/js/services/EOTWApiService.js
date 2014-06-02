angular.module('EOTWApiService', ["QJConfigModule"]).factory('$EOTWApi', ['$resource', "$rootScope",
    function($rootScope,QJConfig) {
        var $res = $resource(AppConfig.apiPath + ':action/:id', {}, {
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: {
                    action: "login"
                }
            }
        });
        return $res;
    }
]);