angular.module('LoginModule', ["QJAuthModule", "QJSocialModule"]).controller('LoginController', function($QJSocial, $scope, $state, $timeout) { //, $QJarvisLogin
    console.info("[LoginController]");
    /*
 	$('.login.ui.modal')
 		.modal();
 	$('.login.ui.modal')
 		.modal("show");
*/
    $scope.fbLogin = function() {
        //checkLoginState();
        $QJSocial.interact(function() {
            $QJSocial.getLoginStatus(function(resp) {
                if (resp.status !== "connected") {
                    FB.login(function(response) {
                        $scope.fbLogin();
                    });
                } else {
                    FB.api('/me', function(response) {
                    	console.log(response);
                        console.log('Successful login for: ' + response.name);
                        console.info('Thanks for logging in, ' + response.name + '!');
                    });
                    $QJAuth.setLogged(true, "token!$$$$");
                    $timeout(function() {
                        $state.go("layout.home");
                    });
                }
            });
        });
    };
    /*

	$scope.data = {
		loginname: "",
		password: ""
	};

	function onSuccess() {
		//CASO: auth exitoso con el servidor.
		$state.go("clarity.home");
	}

	function onFailure() {
		//CASO: Password incorrecto
		//alert("login fail!");

		$(".ui.error.message").toggle(true);
		$(".ui.form").form("add errors", ["Usuario o contraseña incorrectos"]);
		$timeout(function() {
			$(".ui.error.message").toggle(false);
		}, 5000);

	}

	$scope.trylogin = function() {
		console.info("[LoginController][" + "trylogin" + "]");
		$('.ui.form').form('validate form');
	}
	$scope.login = function() {


		console.info("[LoginController][login][(" + $scope.data.loginname + ", " + $scope.data.password + " )]");
		//$QJarvisLogin.login($scope.data.loginname, $scope.data.password, onSuccess, onFailure);
	};


	$scope.FormValidationDefinition = function(onSuccess, onFailure) {
		console.info("[LoginController][ui.form validations]");
		$('.ui.form')
			.form({
				loginname: {
					identifier: 'loginname',
					rules: [{
						type: 'empty',
						prompt: 'Usuario requerido'
					}]
				},
				password: {
					identifier: 'password',
					rules: [{
						type: 'empty',
						prompt: 'Contraseña requerida'
					}]
				}
			}, {
				onSuccess: onSuccess,
				onFailure: onFailure
			});
	}
	$scope.FormValidationDefinition($scope.login, function() {
		console.info("[LoginController][" + "validations failed!" + "]");
	});


*/
})
/*
.factory('$QJarvisLogin', [
	'$resource', "AppConfig", "$rootScope", "$NMSLocalSession", "$NMSAuth",
	function($resource, AppConfig, $rootScope, $NMSLocalSession, $NMSAuth) {

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

		return {
			login: function(loginname, password, success, failure) {
				$res.save({}, {
					loginname: loginname,
					password: password
				}, function(res) {

					if (res.ok == true) {
						console.info("[QJarvisLogin][Success]");

						
						$NMSLocalSession.setData(res.data);
						$NMSAuth.setToken(res.token);
						$NMSAuth.setLogged(true, res.token);
						success();

					} else {
						console.info("[QJarvisLogin][Failure][But resp ok]");
						failure();
					}
					console.info("[QJarvisLogin][Token]->");
					console.info(res);

				}, function() {
					console.info("[QJarvisLogin][Failure]");
					failure();
				})
			}
		}
	}
])
*/
;