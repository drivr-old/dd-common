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
            if (reason.config && reason.config.ignoreErrors !== true &&
                !(reason.status === 404 && reason.config.method === 'GET') &&
                !(reason.status <= 0 && reason.config.timeout)) { // possibly aborted

                var msg = (reason.status > 0) ?
                        reason.data && (reason.data.message || reason.data.Message || reason.data.systemMessage) || 'Unhandled error occurred.' :
                        'Network connection error.';

                if (angular.element('.modal.in [growl][reference=modal]').length) {
                    growler.error(msg, { referenceId: 'modal' });
                } else {
                    growler.error(msg);
                }
            }

            return $q.reject(reason);
        }
    };
}]);