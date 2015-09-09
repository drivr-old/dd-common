/*
 * dd-common
 * http://clickataxi.github.io/dd-common/

 * Version: 0.1.0 - 2015-09-09
 * License: MIT
 */
angular.module("dd.common", ["dd.common.appState","dd.common.growler","dd.common.interceptors.alertsInterceptor","dd.common.interceptors.busyInterceptor","dd.common.interceptors"]);
angular.module('dd.common.appState', []);

angular.module('dd.common.appState').service('appState', [function() {
    var isBusy = false;

    this.isBusy = function() {
        return isBusy;
    };

    this.setBusy = function(val) {
        isBusy = val;
    };
}]);
angular.module('dd.common.growler', ['angular-growl']);

angular.module('dd.common.growler').service('growler', ['growl', function (growl) {
    var alerts = [];

    this.error = function (msg, config) {
        addAlert(msg, 'error', config);
    };

    this.success = function (msg, config) {
        addAlert(msg, 'success', config);
    };

    this.info = function (msg, config) {
        addAlert(msg, 'info', config);
    };

    this.warning = function (msg, config) {
        addAlert(msg, 'warning', config);
    };

    this.clearErrors = function() {
        clearAlerts('error');
    };

    this.clearSuccesses = function() {
        clearAlerts('success');
    };

    this.clearInfos = function() {
        clearAlerts('info');
    };

    this.clearWarnings = function() {
        clearAlerts('warning');
    };

    this.clearAll = function() {
        clearAlerts();
    };

    function clearAlerts(severity) {
        if (!alerts || !alerts.length) {
            return;
        }

        if (!severity) {
            angular.forEach(alerts, function (alert) {
                if (alert && alert.destroy) {
                    alert.destroy();
                }
            });

            alerts.splice(0, alert.length);
            return;
        }

        for (var i = 0; i < alerts.length; i++) {
            if (alerts[i].severity == severity) {
                alerts[i].destroy();
                alerts.splice(i--, 1);
            }
        }
    }

    function addAlert(message, severity, config) {
        var alert = growl[severity](message, config);

        if (!alert) {
            return;
        }

        if (config && config.isPermanent) {
            return;
        }

        alerts.push(alert);
    }
}]);
angular.module('dd.common.interceptors.alertsInterceptor', ['dd.common.growler']);

angular.module('dd.common.interceptors.alertsInterceptor').factory('alertsInterceptor', ['$q', 'growler', function ($q, growler) {
    return {
        'request': function (config) {
            if (config && config.showErrors) {
                growler.clearErrors();
            }

            return config || $q.when(config);
        },
        'responseError': function (reason) {
            var msg = reason.data && (reason.data.systemMessage || reason.data.message || reason.data.Message) || 'Unhandled exception occurred.';
            if (reason && reason.config && reason.config.showErrors) {
                if (!(reason.status === 404 && reason.config.method === 'GET')) {
                    if (angular.element('[growl][reference=modal]').length) {
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
angular.module('dd.common.interceptors', ['dd.common.interceptors.alertsInterceptor', 'dd.common.interceptors.busyInterceptor']);