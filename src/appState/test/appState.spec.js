describe('Application state service tests.', function() {
    var appState,
        $http;

    beforeEach(function() {
        module('dd.common.appState', function($provide) {
            $http = { pendingRequests: [] };

            $provide.value('$http', $http);
        });

        inject(function(_appState_) {
            appState = _appState_;
        });
    });

    describe('Is busy', function() {
        it('can be set and retrieved.', function() {
            expect(appState.isBusy()).toBeFalsy();
            appState.setBusy(true);
            expect(appState.isBusy()).toBeTruthy();
        });
    });
});