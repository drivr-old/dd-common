describe('Busy interceptor tests.', function () {
    var busyInterceptor,
        appState;

    beforeEach(function() {
        module('dd.common.interceptors.busyInterceptor', function ($provide) {
            appState = jasmine.createSpyObj('appState', ['setBusy']);
            $provide.value('appState', appState);
        });

        inject(function(_busyInterceptor_) {
            busyInterceptor = _busyInterceptor_;
        });
    });

    describe('On request', function() {
        it('sets the busy flag if control busy state is enabled.', function () {
            busyInterceptor.request({ controlBusyState: true });
            expect(appState.setBusy).toHaveBeenCalledWith(true);
        });
    });

    describe('On response', function() {
        it('unsets the busy flag if control busy state is enabled.', function () {
            busyInterceptor.response({ config: { controlBusyState: true } });
            expect(appState.setBusy).toHaveBeenCalledWith(false);
        });
    });

    describe('On response error', function () {
        it('unsets the busy flag if control busy state is enabled.', function () {
            busyInterceptor.responseError({ config: { controlBusyState: true } });
            expect(appState.setBusy).toHaveBeenCalledWith(false);
        });
    });
});