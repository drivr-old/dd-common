angular.module('dd.common.demo').controller('AppStateDemoCtrl', ['$scope', 'appState', function($scope, appState) {
    $scope.isBusy = function() {
        return appState.isBusy();
    };

    $scope.toggleBusy = function() {
        appState.setBusy(!appState.isBusy());
    };
}]);