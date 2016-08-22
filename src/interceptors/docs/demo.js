var demo = angular.module('dd.common.demo');
demo.controller('InterceptorsDemoCtrl', ['$scope', '$http', '$httpBackend', '$modal', 'appState', '$cookies', function($scope, $http, $httpBackend, $modal, appState, $cookies) {
    $scope.appState = appState;
    $scope.aspxCookie = '';
    $scope.requestHeaders = '';

    $scope.fail = function(errorCode) {
        var url = 'http://server.local/fake/' + errorCode;
        $httpBackend.whenGET(url).respond(errorCode, {
            message: 'Fake error response: ' + errorCode
        });
        $http.get(url, {});
    };

    $scope.noError = function() {
        var url = 'http://server.local/fake/noerror';
        $httpBackend.whenGET(url).respond(500, {
            message: 'This will not be shown.'
        });
        $http.get(url, {
            ignoreErrors: true
        });
    };

    $scope.openModal = function() {
        $modal.open({
            templateUrl: 'modal.html'
        });
    };

    $scope.makeRequest = function() {
        var url = 'http://jsonplaceholder.typicode.com/comments';
        $httpBackend.whenGET(url).passThrough();

        $http.get(url, { controlBusyState: true });
    };

    $scope.makeCORSRequest = function() {
        $cookies.put('.ASPXAUTH', $scope.aspxCookie);

        var url = 'https://admin.master.drivr.com/api/fake';
        $httpBackend.whenGET(url).respond(200);

        $http.get(url).then(function(response) {
            $scope.requestHeaders = JSON.stringify(response.config.headers, null, 2);
        });
    };
}]);

demo.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('alertsInterceptor');
    $httpProvider.interceptors.push('busyInterceptor');
    $httpProvider.interceptors.push('corsAuthInterceptor');
}]);