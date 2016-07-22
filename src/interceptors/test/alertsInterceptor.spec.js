describe('Alerts interceptor tests.', function () {
    var alertsInterceptor,
        growler;

    beforeEach(function() {
        module('dd.common.interceptors.alertsInterceptor', function ($provide) {
            growler = jasmine.createSpyObj('growler', ['error', 'clearErrors']);
            $provide.value('growler', growler);
        });

        inject(function(_alertsInterceptor_) {
            alertsInterceptor = _alertsInterceptor_;
        });
    });

    describe('On request', function() {
        it('clears all errrors if error reporting is enabled.', function () {
            alertsInterceptor.request({});
            expect(growler.clearErrors).toHaveBeenCalled();
        });
    });

    describe('On response error', function () {
        it('shows an error message if error reporting is enabled.', function () {
            var reason = { status: 400, data: { message: 'error msg' }, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith(reason.data.message);
        });

        it('shows message over system message.', function () {
            var reason = { status: 400, data: { message: 'user msg', systemMessage: 'system msg' }, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith(reason.data.message);
        });

        it('shows system message if no message.', function () {
            var reason = { status: 400, data: { systemMessage: 'system msg' }, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith(reason.data.systemMessage);
        });

        it('doesnt show an error message if error reporting is not enabled.', function () {
            var reason = { config: { ignoreErrors: true } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalled();
        });

        it('doesnt show an error message for GET 404 error response.', function() {
            var reason = { config: { method: 'GET', ignoreErrors: true }, status: 404 };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalled();
        });

        it('shows a connection error message if status is 0.', function () {
            var reason = { status: 0, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith('Network connection error.');
        });

        it('shows a connection error message if status is -1.', function () {
            var reason = { status: -1, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith('Network connection error.');
        });

        it('doesnt show a connection error message if request has a timeout.', function () {
            var reason = { status: -1, config: { timeout: {} } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalled();
        });

        it('shows an error message on modal dialog if visible modal growl container is found.', function () {
            inject(function ($compile, $rootScope, $document) {
                var element = $compile('<div class="modal"><div growl reference="modal"></div></div>')($rootScope);
                element.appendTo($document[0].body);
                $rootScope.$digest();
            });

            var reason = { status: 400, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalledWith('Unhandled error occurred.', { referenceId: 'modal' });
            expect(growler.error).toHaveBeenCalledWith('Unhandled error occurred.');

            angular.element('.modal').addClass('in');
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith('Unhandled error occurred.', { referenceId: 'modal' });
        });
    });
});