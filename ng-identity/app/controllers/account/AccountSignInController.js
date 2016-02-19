var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var SignIn = (function () {
            function SignIn($scope, $state, $log, authService) {
                this.$scope = $scope;
                this.$state = $state;
                this.$log = $log;
                this.authService = authService;
                this.message = '';
                this.loginData = {
                    userName: '',
                    password: ''
                };
                authService.Logout();
            }
            SignIn.prototype.SignIn = function () {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.loginForm.$invalid)
                    return;
                this.authService.Login(this.loginData).then(function () {
                    _this.$state.go('account');
                }).catch(function (reason) {
                    _this.message = reason.error_description;
                });
            };
            ;
            SignIn.$inject = ['$scope', '$state', '$log', 'authService'];
            return SignIn;
        })();
        angular.module('app').controller('AccountSignInController', SignIn);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
