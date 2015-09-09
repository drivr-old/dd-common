var demo = angular.module('dd.common.demo').controller('growlerDemoCtrl', function ($scope, growler) {
    $scope.errorMsg = 'Sample error';
    $scope.successMsg = 'Sample success';
    $scope.infoMsg = 'Sample info';
    $scope.warningMsg = 'Sample warning';
    
    $scope.isPermanent = false;

    $scope.addError = function() {
        growler.error($scope.errorMsg, { isPermanent: $scope.isPermanent });
    };

    $scope.addSuccess = function() {
        growler.success($scope.successMsg, { isPermanent: $scope.isPermanent });
    };

    $scope.addInfo = function() {
        growler.info($scope.infoMsg, { isPermanent: $scope.isPermanent });
    };

    $scope.addWarning = function() {
        growler.warning($scope.warningMsg, { isPermanent: $scope.isPermanent });
    };

    $scope.clearErrors = function () {
        growler.clearErrors();
    };

    $scope.clearSuccess = function () {
        growler.clearSuccesses();
    };

    $scope.clearInfos = function () {
        growler.clearInfos();
    };

    $scope.clearWarnings = function () {
        growler.clearWarnings();
    };

    $scope.clearAll = function () {
        growler.clearAll();
    };
});