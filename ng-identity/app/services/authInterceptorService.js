var app;
(function (app) {
    var services;
    (function (services) {
        var AuthInterceptor = (function () {
            function AuthInterceptor($q, $location, localStorageService) {
                this.$q = $q;
                this.$location = $location;
                this.localStorageService = localStorageService;
                //this.authInterceptorServiceFactory = {
                //    request: this._Request(),
                //    responseError: this._ResponseError()
                //};
            }
            AuthInterceptor.prototype._Request = function (config) {
                config.headers = config.headers || {};
                var authData = this.localStorageService.get('authorizationData');
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.token;
                }
                return config;
            };
            ;
            AuthInterceptor.prototype._ResponseError = function (rejection) {
                if (rejection.status === 401) {
                    this.$location.path('/login');
                }
                return this.$q.reject(rejection);
            };
            AuthInterceptor.$inject = ['$q', '$location', 'localStorageService'];
            return AuthInterceptor;
        })();
        angular.module('app').service('authInterceptorService', AuthInterceptor);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=authInterceptorService.js.map