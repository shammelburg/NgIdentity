var app;
(function (app) {
    var services;
    (function (services) {
        var Auth = (function () {
            function Auth($http, $q, localStorageService, $state) {
                this.$http = $http;
                this.$q = $q;
                this.localStorageService = localStorageService;
                this.$state = $state;
                this.authentication = {
                    isAuth: false,
                    isAdmin: false,
                    role: '',
                    userName: ''
                };
                this.webApiUrl = Common.Api.prototype.WebAPIUrl();
            }
            Auth.prototype.Registration = function (model) {
                return this.$http.post(this.webApiUrl + 'api/account/register', model);
            };
            ;
            Auth.prototype.Login = function (loginData) {
                var _this = this;
                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
                var deferred = this.$q.defer();
                this.$http.post(this.webApiUrl + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                    _this.localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, role: response.roles });
                    _this.authentication.isAuth = true;
                    _this.authentication.isAdmin = response.roles == 'Admin' ? true : false;
                    _this.authentication.role = response.roles;
                    _this.authentication.userName = loginData.userName;
                    deferred.resolve(response);
                }).error(function (err, status) {
                    //this.Logout();
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            ;
            Auth.prototype.Logout = function () {
                this.localStorageService.remove('authorizationData');
                this.authentication.isAuth = false;
                this.authentication.isAdmin = false;
                this.authentication.role = '';
                this.authentication.userName = '';
            };
            ;
            Auth.prototype.SetAuthData = function () {
                var authData = this.localStorageService.get('authorizationData');
                if (authData) {
                    this.authentication.isAuth = true;
                    this.authentication.isAdmin = authData.role == 'Admin' ? true : false;
                    this.authentication.role = authData.role;
                    this.authentication.userName = authData.userName;
                }
            };
            ;
            Auth.prototype.Check = function (array) {
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
            ;
            Auth.$inject = ['$http', '$q', 'localStorageService', '$state'];
            return Auth;
        })();
        angular.module('app').service('authService', Auth);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=authService.js.map