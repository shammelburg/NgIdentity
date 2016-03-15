var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var SignIn = (function () {
            function SignIn($scope, $state, $log, authService, $window) {
                this.$scope = $scope;
                this.$state = $state;
                this.$log = $log;
                this.authService = authService;
                this.$window = $window;
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
                    // cause the page post back, sets auth header
                    _this.$window.location.href = '/myaccount';
                    // cause weird auth error for certain controllers methods                
                    //this.$state.go('account');
                }).catch(function (reason) {
                    _this.message = reason.error_description;
                });
            };
            ;
            SignIn.$inject = ['$scope', '$state', '$log', 'authService', '$window'];
            return SignIn;
        })();
        angular.module('app').controller('AccountSignInController', SignIn);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=AccountSignInController.js.map