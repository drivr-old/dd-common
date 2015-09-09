angular.module('dd.common.interceptors.busyInterceptor', ['dd.common.appState']);

angular.module('dd.common.interceptors.busyInterceptor').factory('busyInterceptor', ['$q', 'appState', function ($q, appState) {
    return {
        'request': function (config) {
            if (config && config.controlBusyState) {
                appState.setBusy(true);
            }
            
            return config || $q.when(config);
        },
        'response': function (response) {
            if (response && response.config && response.config.controlBusyState) {
                appState.setBusy(false);
            }

            return response || $q.when(response);
        },
        'responseError': function (reason) {
            if (reason && reason.config && reason.config.controlBusyState) {
                appState.setBusy(false);
            }

            return $q.reject(reason);
        }
    };
}]);