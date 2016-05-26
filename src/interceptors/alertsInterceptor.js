angular.module('dd.common.interceptors.alertsInterceptor', ['dd.common.growler']);

angular.module('dd.common.interceptors.alertsInterceptor').factory('alertsInterceptor', ['$q', 'growler', function ($q, growler) {
    return {
        'request': function (config) {
            if (config && config.ignoreErrors !== true) {
                growler.clearErrors();
            }

            return config || $q.when(config);
        },
        'responseError': function (reason) {
            var msg = reason.data && (reason.data.systemMessage || reason.data.message || reason.data.Message) || 'Unhandled exception occurred.';
            if (reason && reason.config && reason.config.ignoreErrors !== true) {
                if (!(reason.status === 404 && reason.config.method === 'GET')) {
                    if (angular.element('.modal.in [growl][reference=modal]').length) {
                        growler.error(msg, { referenceId: 'modal' });
                    } else {
                        growler.error(msg);
                    }
                }
            }

            return $q.reject(reason);
        }
    };
}]);