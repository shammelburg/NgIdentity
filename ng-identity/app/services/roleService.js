var app;
(function (app) {
    var services;
    (function (services) {
        var Role = (function () {
            function Role($http, localStorageService) {
                this.$http = $http;
                this.localStorageService = localStorageService;
                var api = new Common.Api(localStorageService);
                this.webApiUrl = api.WebAPIUrl();
                this.config = api.Config();
            }
            Role.prototype.Get = function () {
                return this.$http.get(this.webApiUrl + 'api/Role/Get', this.config);
            };
            ;
            Role.prototype.Add = function (roleName) {
                return this.$http.post(this.webApiUrl + 'api/Role/Post?Name=' + roleName, this.config);
            };
            ;
            Role.prototype.Delete = function (roleName) {
                return this.$http.post(this.webApiUrl + 'api/Role/Delete?Name=' + roleName, this.config);
            };
            ;
            Role.$inject = ['$http', 'localStorageService'];
            return Role;
        })();
        angular.module('app').service('roleService', Role);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=roleService.js.map