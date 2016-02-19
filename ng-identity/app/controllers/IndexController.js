var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var Index = (function () {
            function Index($location, $window, authService) {
                this.$location = $location;
                this.$window = $window;
                this.authService = authService;
                this.authentication = authService.authentication;
            }
            Index.prototype.ForceSSL = function () {
                if (this.$location.protocol() !== 'https') {
                    this.$window.location.href = this.$location.absUrl().replace('http', 'https');
                }
            };
            ;
            Index.prototype.LogOut = function () {
                this.authService.Logout();
                this.$window.location.href = '/home';
            };
            ;
            Index.$inject = ['$location', '$window', 'authService'];
            return Index;
        })();
        controllers.Index = Index;
        angular.module('app').controller('IndexController', Index);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
