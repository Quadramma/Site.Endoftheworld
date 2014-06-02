angular.module('QJAuthModule', [
	"QJConfigModule"
])

.factory('$QJAuth', ["$rootScope", "$QJConfig", "$http",
	function($rootScope, $QJConfig, $http) {
		var getToken = function() {
			return store.get("nms_" + $QJConfig.AppIdentifier + "_token") || {};
		};
		setToken = function(token) {
			store.set("nms_" + $QJConfig.AppIdentifier + "_token", token);
		};
		return {
			getToken: getToken,
			setToken: setToken,
			setLogged: function(val, token) {
				//Todos los http calls envian el token
				setToken(token);
				$http.defaults.headers.common['auth-token'] = getToken();
				$rootScope.logged = val; //flag que se checkea en el route 
			}
		}
	}
])

.factory('$QJLocalSession', ["$QJConfig",
	function($QJConfig) {
		return {

			getData: function() {
				return store.get("nms_" + $QJConfig.AppIdentifier + "_session") || {};
			},
			setData: function(data) {
				store.set("nms_" + $QJConfig.AppIdentifier + "_session", data);
			}
		}
	}
]);