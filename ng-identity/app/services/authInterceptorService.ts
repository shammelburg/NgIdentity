module app.services {

    interface IAuthInterceptorFactory {
        request: any;
        responseError: any;
    }

    interface IAuthInterceptor {
        authInterceptorServiceFactory: IAuthInterceptorFactory;
    }

    class AuthInterceptor implements IAuthInterceptor {
        authInterceptorServiceFactory: IAuthInterceptorFactory;

        static $inject = ['$q', '$location', 'localStorageService'];
        constructor(private $q: ng.IQService, private $location: ng.ILocationService, private localStorageService) {
            //this.authInterceptorServiceFactory = {
            //    request: this._Request(),
            //    responseError: this._ResponseError()
            //};
        }

        private _Request(config): any {
            config.headers = config.headers || {};

            var authData = this.localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        };

        private _ResponseError(rejection: any): any {
            if (rejection.status === 401) {
                this.$location.path('/login');
            }
            return this.$q.reject(rejection);
        }
    }
    angular.module('app').service('authInterceptorService', AuthInterceptor);
}
