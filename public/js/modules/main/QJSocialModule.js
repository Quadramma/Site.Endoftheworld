angular.module('QJSocialModule', []).factory('$QJSocial', ["$rootScope",
    function($rootScope) {
        if (_.isUndefined($rootScope.qjsocial)) {
            $rootScope.qjsocial = {
                interact: function(handler) {
                    handler();
                },
                onStatusChange: function(callback) {
                    this.statusChange = callback;
                },
                getLoginStatus: function(callback) {
                    FB.getLoginStatus(function(response) {
                        callback(response);
                    });
                },
                init: function(settings) { //{appId}
                    var self = this;
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: settings.appId,
                            cookie: true, // enable cookies to allow the server to access 
                            // the session
                            xfbml: true, // parse social plugins on this page
                            version: 'v2.0' // use version 2.0
                        });
                        // Now that we've initialized the JavaScript SDK, we call 
                        // FB.getLoginStatus().  This function gets the state of the
                        // person visiting this page and can return one of three states to
                        // the callback you provide.  They can be:
                        //
                        // 1. Logged into your app ('connected')
                        // 2. Logged into Facebook, but not your app ('not_authorized')
                        // 3. Not logged into Facebook and can't tell if they are logged into
                        //    your app or not.
                        //
                        // These three cases are handled in the callback function.
                        FB.getLoginStatus(function(response) {
                            if (!_.isUndefined(self.statusChange)) {
                                self.statusChange(response);
                            } else {
                                console.info("QJSocial require statusChange !");
                            }
                        });
                    };
                    // Load the SDK asynchronously
                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                }
            };
        }
        return $rootScope.qjsocial;
    }
]);