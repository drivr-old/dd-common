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