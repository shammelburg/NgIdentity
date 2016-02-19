var app;
(function (app) {
    var services;
    (function (services) {
        var Account = (function () {
            function Account($http, localStorageService) {
                this.$http = $http;
                this.localStorageService = localStorageService;
                var api = new Common.Api(localStorageService);
                this.webApiUrl = api.WebAPIUrl();
                this.config = api.Config();
            }
            Account.prototype.Forgot = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/Account/ForgotPassword', vm);
            };
            ;
            Account.prototype.ConfirmEmail = function (id, token) {
                return this.$http.post(this.webApiUrl + 'api/Account/ConfirmEmail?u=' + id + '&t=' + token, null);
            };
            ;
            Account.prototype.ResetPassword = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/Account/ResetPassword', vm);
            };
            ;
            Account.prototype.SendConfirmationEmail = function () {
                return this.$http.post(this.webApiUrl + 'api/Account/SendConfirmationEmail', null, this.config);
            };
            ;
            Account.prototype.ChangePassword = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/Account/ChangePassword', vm, this.config);
            };
            ;
            Account.prototype.UserInfo = function () {
                return this.$http.get(this.webApiUrl + 'api/Account/GetUserInfo', this.config);
            };
            ;
            Account.prototype.UpdateUserInfo = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/Account/UpdateUserInfo', vm, this.config);
            };
            ;
            Account.$inject = ['$http', 'localStorageService'];
            return Account;
        })();
        angular.module('app').service('accountService', Account);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
