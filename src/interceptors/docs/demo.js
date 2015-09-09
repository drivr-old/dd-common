var demo = angular.module('dd.common.demo');
demo.controller('InterceptorsDemoCtrl', ['$scope', '$http', '$httpBackend', '$modal', 'appState', function($scope, $http, $httpBackend, $modal, appState) {
    $scope.fail = function(errorCode) {
        var url = 'http://server.local/fake/' + errorCode;
        $httpBackend.whenGET(url).respond(errorCode, {
            message: 'Fake error response: ' + errorCode
        });
        $http.get(url, {
            showErrors: true
        });
    };

    $scope.noError = function() {
        var url = 'http://server.local/fake/noerror';
        $httpBackend.whenGET(url).respond(500, {
            message: 'This will not be shown.'
        });
        $http.get(url, {
            showErrors: false
        });
    };

    $scope.openModal = function() {
        $modal.open({
            templateUrl: 'modal.html'
        });
    };
}]);

demo.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('alertsInterceptor');
}]);