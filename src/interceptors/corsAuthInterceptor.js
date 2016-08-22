angular.module('dd.common.interceptors.corsAuthInterceptor', ['ngCookies']);

angular.module('dd.common.interceptors.corsAuthInterceptor').factory('corsAuthInterceptor', ['$window', '$cookies', function($window, $cookies) {
    return {
        request: function(cfg) {
            var matches = cfg.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            var domain = matches && matches[1];  // domain will be null if no match is found

            if (domain && $window.location.host !== domain && domain.startsWith('admin') && domain.endsWith('drivr.com') && !cfg.headers.Authorization) {
                var aspxAuth = $cookies.get('.ASPXAUTH');
                if (aspxAuth) {
                    cfg.headers.Authorization = aspxAuth;
                }
            }

            return cfg;
        }
    };
}]);