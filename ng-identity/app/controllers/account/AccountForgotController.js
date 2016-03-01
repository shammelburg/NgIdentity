var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AccountForgot = (function () {
            function AccountForgot($scope, accountService, $timeout, $location) {
                this.$scope = $scope;
                this.accountService = accountService;
                this.$timeout = $timeout;
                this.$location = $location;
                this.message = '';
                this.isSuccess = false;
            }
            AccountForgot.prototype.SendLink = function (vm) {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.forgotForm.$invalid)
                    return;
                this.accountService.Forgot(vm).then(function (response) {
                    _this.model = {};
                    _this.isSuccess = true;
                    _this.message = response.data + ' You will be redirected to the sign in page in 3 seconds.';
                    _this.$timeout(function () {
                        _this.$location.path('/signin');
                    }, 3000);
                }).catch(function (reason) { _this.message = reason.data.Message + ' Please check your email address and try again.'; });
            };
            ;
            AccountForgot.$inject = ['$scope', 'accountService', '$timeout', '$location'];
            return AccountForgot;
        })();
        angular.module('app').controller('AccountForgotController', AccountForgot);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=AccountForgotController.js.map