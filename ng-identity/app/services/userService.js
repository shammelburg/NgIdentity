var app;
(function (app) {
    var services;
    (function (services) {
        var User = (function () {
            function User($http, localStorageService) {
                this.$http = $http;
                this.localStorageService = localStorageService;
                var api = new Common.Api(localStorageService);
                this.webApiUrl = api.WebAPIUrl();
                this.config = api.Config();
            }
            User.prototype.Get = function () {
                return this.$http.get(this.webApiUrl + 'api/User/Get', this.config);
            };
            ;
            User.prototype.GetUser = function (Id) {
                return this.$http.get(this.webApiUrl + 'api/User/GetUser?Id=' + Id, this.config);
            };
            ;
            User.prototype.UpdateUser = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/User/UpdateUser', vm, this.config);
            };
            ;
            User.prototype.ResetPassword = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/User/ResetPassword', vm, this.config);
            };
            ;
            User.prototype.UserRoles = function (Id) {
                return this.$http.get(this.webApiUrl + 'api/User/GetUserRoles?Id=' + Id, this.config);
            };
            ;
            User.prototype.AddUserRoles = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/User/AddToRole', vm, this.config);
            };
            ;
            User.prototype.RemoveUserRoles = function (vm) {
                return this.$http.post(this.webApiUrl + 'api/User/RemoveFromRole', vm, this.config);
            };
            ;
            User.$inject = ['$http', 'localStorageService'];
            return User;
        })();
        angular.module('app').service('userService', User);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
