var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var Reset = (function () {
            function Reset($scope, $log, $state, accountService, $stateParams, $timeout) {
                this.$scope = $scope;
                this.$log = $log;
                this.$state = $state;
                this.accountService = accountService;
                this.$stateParams = $stateParams;
                this.$timeout = $timeout;
                if (!this.$stateParams.u || !this.$stateParams.c) {
                    this.message = 'An error occurred. Please send yourself another email with the link and try again.';
                }
                this.isSuccess = false;
            }
            Reset.prototype.Reset = function (user) {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.resetForm.$invalid)
                    return;
                var model = { Code: this.$stateParams.c, Id: this.$stateParams.u, Password: user.password };
                this.accountService.ResetPassword(model).then(function (response) {
                    _this.user = {};
                    _this.isSuccess = true;
                    _this.message = response.data + ' You will be redirected in 3 seconds.';
                    _this.$timeout(function () {
                        this.$state.go('account-signin');
                    }, 3000);
                }).catch(function (reason) { _this.message = reason.data.Message; });
            };
            ;
            Reset.$inject = ['$scope', '$log', '$state', 'accountService', '$stateParams', '$timeout'];
            return Reset;
        })();
        angular.module('app').controller('AccountResetController', Reset);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
