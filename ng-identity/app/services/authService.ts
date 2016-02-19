module app.services {

    interface IAuthentication {
        isAuth: boolean;
        isAdmin: boolean;
        role: string;
        userName: string;
    }

    export interface IAuthService {
        authentication: IAuthentication;
        Registration(model:any): ng.IHttpPromise<any>;
        Login(loginData: any): any;
        Logout(): void;
        SetAuthData(): void;
        Check(array:string[]): void;
    }

    class Auth implements IAuthService {
        authentication: IAuthentication;
        webApiUrl: string;

        static $inject = ['$http', '$q', 'localStorageService', '$state'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private localStorageService: any, private $state: ng.ui.IStateService) {
            this.authentication = {
                isAuth: false,
                isAdmin: false,
                role: '',
                userName: ''
            };
            this.webApiUrl = Common.Api.prototype.WebAPIUrl();
        }

        Registration(model:any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/account/register', model);
        };
        Login(loginData: app.controllers.ILoginData): any {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            var deferred = this.$q.defer();

            this.$http.post(this.webApiUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success((response: any) => {

                this.localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, role: response.roles });

                this.authentication.isAuth = true;
                this.authentication.isAdmin = response.roles == 'Admin' ? true : false;
                this.authentication.role = response.roles;
                this.authentication.userName = loginData.userName;

                deferred.resolve(response);

            }).error(function (err, status) {
                //this.Logout();
                deferred.reject(err);
            });

            return deferred.promise;
        };
        Logout(): void {
            this.localStorageService.remove('authorizationData');

            this.authentication.isAuth = false;
            this.authentication.isAdmin = false;
            this.authentication.role = '';
            this.authentication.userName = '';
        };
        SetAuthData(): void {
            var authData = this.localStorageService.get('authorizationData');

            if (authData) {
                this.authentication.isAuth = true;
                this.authentication.isAdmin = authData.role == 'Admin' ? true : false;
                this.authentication.role = authData.role;
                this.authentication.userName = authData.userName;
            }
        };
        Check(array:string[]): void {
            if (!this.authentication.isAuth) {
                this.$state.go('account-signin');
            }

            if (array.length > 0) {
                var pass = false;
                for (var i = 0; i < array.length; i++) {
                    if (this.authentication.role == array[i]) {
                        pass = true;
                    }
                }
                if (!pass) {
                    this.$state.go('account-signin');
                }
            }
        };
    }

    angular.module('app').service('authService', Auth);
}