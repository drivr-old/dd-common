/*
 * dd-common
 * http://clickataxi.github.io/dd-common/

 * Version: 0.1.0 - 2015-09-09
 * License: MIT
 */
angular.module("dd.common", ["dd.common.growler"]);
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