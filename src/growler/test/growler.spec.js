describe('Growler tests.', function () {
    var growler,
        growl,
        errorAlert,
        successAlert,
        infoAlert,
        warningAlert;

    beforeEach(function() {
        module('dd.common.growler', function ($provide) {
            // alert mocks
            errorAlert = { destroy: jasmine.createSpy('destroy'), severity: 'error' };
            successAlert = { destroy: jasmine.createSpy('destroy'), severity: 'success' };
            infoAlert = { destroy: jasmine.createSpy('destroy'), severity: 'info' };
            warningAlert = { destroy: jasmine.createSpy('destroy'), severity: 'warning' };

            // growl mock
            growl = jasmine.createSpyObj('growl', ['error', 'success', 'info', 'warning']);
            growl.error.and.returnValue(errorAlert);
            growl.success.and.returnValue(successAlert);
            growl.info.and.returnValue(infoAlert);
            growl.warning.and.returnValue(warningAlert);

            $provide.value('growl', growl);
        });
        
        inject(function(_growler_) {
            growler = _growler_;
        });
    });

    describe('Error alert', function() {
        it('can be added.', function () {
            var config = { referenceId: 1 };
            growler.error('message', config);
            expect(growl.error).toHaveBeenCalledWith('message', config);
        });

        it('can be cleared.', function () {
            growler.error('message1');
            growler.error('message2');
            growler.error('message3');

            growler.clearErrors();

            expect(errorAlert.destroy.calls.count()).toBe(3);
            errorAlert.destroy.calls.reset();

            growler.clearErrors();
            expect(errorAlert.destroy.calls.count()).toBe(0);
        });
    });

    describe('Success alert', function () {
        it('can be added.', function () {
            var config = { referenceId: 1 };
            growler.success('message', config);
            expect(growl.success).toHaveBeenCalledWith('message', config);
        });

        it('can be cleared.', function () {
            growler.success('message1');
            growler.success('message2');
            growler.success('message3');

            growler.clearSuccesses();

            expect(successAlert.destroy.calls.count()).toBe(3);
            successAlert.destroy.calls.reset();

            growler.clearSuccesses();
            expect(successAlert.destroy.calls.count()).toBe(0);
        });
    });

    describe('Info alert', function () {
        it('can be added.', function () {
            var config = { referenceId: 1 };
            growler.info('message', config);
            expect(growl.info).toHaveBeenCalledWith('message', config);
        });

        it('can be cleared.', function () {
            growler.info('message1');
            growler.info('message2');
            growler.info('message3');

            growler.clearInfos();

            expect(infoAlert.destroy.calls.count()).toBe(3);
            infoAlert.destroy.calls.reset();

            growler.clearInfos();
            expect(infoAlert.destroy.calls.count()).toBe(0);
        });
    });

    describe('Warning alert', function () {
        it('can be added.', function () {
            var config = { referenceId: 1 };
            growler.warning('message', config);
            expect(growl.warning).toHaveBeenCalledWith('message', config);
        });

        it('can be cleared.', function () {
            growler.warning('message1');
            growler.warning('message2');

            growler.clearWarnings();

            expect(warningAlert.destroy.calls.count()).toBe(2);
            warningAlert.destroy.calls.reset();

            growler.clearWarnings();
            expect(warningAlert.destroy.calls.count()).toBe(0);
        });
    });

    describe('Alerts', function () {
        it('can all be cleared at once.', function () {
            growler.success('message1');
            growler.success('message2');
            growler.error('message3');
            growler.error('message4');
            growler.info('message5');
            growler.warning('message6');

            growler.clearAll();

            expect(errorAlert.destroy.calls.count()).toBe(2);
            expect(successAlert.destroy.calls.count()).toBe(2);
            expect(infoAlert.destroy.calls.count()).toBe(1);
            expect(warningAlert.destroy.calls.count()).toBe(1);
        });

        it('can all be cleared separately.', function () {
            growler.success('message1');
            growler.error('message2');
            growler.success('message3');
            growler.info('message4');
            growler.error('message5');
            growler.warning('message6');
            growler.error('message7');

            growler.clearErrors();
            expect(errorAlert.destroy.calls.count()).toBe(3);
            expect(successAlert.destroy.calls.count()).toBe(0);
            expect(infoAlert.destroy.calls.count()).toBe(0);
            expect(warningAlert.destroy.calls.count()).toBe(0);
            errorAlert.destroy.calls.reset();

            growler.clearSuccesses();
            expect(errorAlert.destroy.calls.count()).toBe(0);
            expect(successAlert.destroy.calls.count()).toBe(2);
            expect(infoAlert.destroy.calls.count()).toBe(0);
            expect(warningAlert.destroy.calls.count()).toBe(0);
            successAlert.destroy.calls.reset();

            growler.clearInfos();
            expect(errorAlert.destroy.calls.count()).toBe(0);
            expect(successAlert.destroy.calls.count()).toBe(0);
            expect(infoAlert.destroy.calls.count()).toBe(1);
            expect(warningAlert.destroy.calls.count()).toBe(0);
            infoAlert.destroy.calls.reset();

            growler.clearWarnings();
            expect(errorAlert.destroy.calls.count()).toBe(0);
            expect(successAlert.destroy.calls.count()).toBe(0);
            expect(infoAlert.destroy.calls.count()).toBe(0);
            expect(warningAlert.destroy.calls.count()).toBe(1);
        });

        it('are not cleared if permanent flag is provided in config.', function() {
            growler.success('message1', { isPermanent: true });
            growler.info('message2', { isPermanent: true });
            growler.error('message3', { isPermanent: true });
            growler.warning('message4', { isPermanent: true });

            growler.clearAll();

            expect(errorAlert.destroy.calls.count()).toBe(0);
            expect(successAlert.destroy.calls.count()).toBe(0);
            expect(infoAlert.destroy.calls.count()).toBe(0);
            expect(warningAlert.destroy.calls.count()).toBe(0);
        });

        it('are not cleared if growl does not create them.', function() {
            growl.error.and.returnValue(undefined);
            growl.info.and.returnValue(undefined);
            growl.success.and.returnValue(undefined);
            growl.warning.and.returnValue(undefined);

            growler.success('message1');
            growler.info('message2');
            growler.error('message3');
            growler.warning('message4');

            growler.clearErrors();
            growler.clearSuccesses();
            growler.clearInfos();
            growler.clearWarnings();

            expect(errorAlert.destroy.calls.count()).toBe(0);
            expect(successAlert.destroy.calls.count()).toBe(0);
            expect(infoAlert.destroy.calls.count()).toBe(0);
            expect(warningAlert.destroy.calls.count()).toBe(0);
        });
    });
});