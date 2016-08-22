describe('Authentication interceptor tests.', function () {
    var corsAuthInterceptor,
        $cookies,
        $window;

    beforeEach(function() {
        angular.module('ngCookies', []);
        module('dd.common.interceptors.corsAuthInterceptor', function ($provide) {
            $cookies = jasmine.createSpyObj('$cookies', ['get']);
            $window = { location: { host: '' } };

            $provide.value('$cookies', $cookies);
            $provide.value('$window', $window);

            $cookies.get.and.returnValue('12345');
        });

        inject(function(_corsAuthInterceptor_) {
            corsAuthInterceptor = _corsAuthInterceptor_;
        });
    });

    describe('On request', function() {
        it('adds ASPXAUTH cookie to Authorization header if requesting remote Drivr services.', function () {
            var cfg = corsAuthInterceptor.request({ url: 'https://admin.master.drivr.com/position/api/boundaries', headers: {} });
            
            expect($cookies.get).toHaveBeenCalledWith('.ASPXAUTH');
            expect(cfg.headers.Authorization).toEqual('12345');
        });

        it('does nothing if request is made for same domain.', function () {
            $window.location.host = 'admin.master.drivr.com';
            var cfg = corsAuthInterceptor.request({ url: 'https://admin.master.drivr.com/position/api/boundaries', headers: {} });
            expect(cfg.headers.Authorization).not.toBeDefined();
        });

        it('does nothing if ASPXAUTH cookie does not exist.', function () {
            $cookies.get.and.returnValue(null);
            var cfg = corsAuthInterceptor.request({ url: 'https://admin.master.drivr.com/position/api/boundaries', headers: {} });
            expect(cfg.headers.Authorization).not.toBeDefined();
        });

        it('does nothing if Authorization header already exists.', function () {
            var cfg = corsAuthInterceptor.request({ url: 'https://admin.master.drivr.com/position/api/boundaries', headers: { Authorization: '1234' } });

            expect(cfg.headers.Authorization).toEqual('1234');
        });

        it('does nothing for non Drivr service domains.', function () {
            var cfg = corsAuthInterceptor.request({ url: 'https://master.drivr.com/position/api/boundaries', headers: {} });
            expect(cfg.headers.Authorization).not.toBeDefined();

            cfg = corsAuthInterceptor.request({ url: 'https://admin.clickataxi.com/position/api/boundaries', headers: {} });
            expect(cfg.headers.Authorization).not.toBeDefined();
        });
    });
});