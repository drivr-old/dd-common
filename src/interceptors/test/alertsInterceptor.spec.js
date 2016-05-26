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
            var reason = { data: { message: 'error msg' }, config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith(reason.data.message);
        });

        it('doesnt show an error message if error reporting is not enabled.', function () {
            var reason = { config: { doNotShowErrors: true } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalled();
        });

        it('doesnt show an error message for GET 404 error response.', function() {
            var reason = { config: { method: 'GET', doNotShowErrors : true }, status: 404 };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalled();
        });

        it('shows an error message on modal dialog if visible modal growl container is found.', function () {
            inject(function ($compile, $rootScope, $document) {
                var element = $compile('<div class="modal"><div growl reference="modal"></div></div>')($rootScope);
                element.appendTo($document[0].body);
                $rootScope.$digest();
            });

            var reason = { config: { } };
            alertsInterceptor.responseError(reason);
            expect(growler.error).not.toHaveBeenCalledWith('Unhandled exception occurred.', { referenceId: 'modal' });
            expect(growler.error).toHaveBeenCalledWith('Unhandled exception occurred.');

            angular.element('.modal').addClass('in');
            alertsInterceptor.responseError(reason);
            expect(growler.error).toHaveBeenCalledWith('Unhandled exception occurred.', { referenceId: 'modal' });
        });
    });
});