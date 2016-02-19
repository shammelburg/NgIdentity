var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AccountChange = (function () {
            function AccountChange($scope, $log, $state, accountService) {
                this.$scope = $scope;
                this.$log = $log;
                this.$state = $state;
                this.accountService = accountService;
                this.something = function () { };
            }
            AccountChange.prototype.ChangePassword = function (model) {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.changeForm.$invalid)
                    return;
                this.accountService.ChangePassword(model).then(function (response) {
                    _this.model = {};
                    _this.message = response.data;
                    _this.isSuccess = true;
                }).catch(function (reason) { _this.message = reason.data.Message; });
            };
            ;
            AccountChange.prototype.Somthing = function () { };
            ;
            AccountChange.$inject = ['$scope', '$log', '$state', 'accountService'];
            return AccountChange;
        })();
        angular.module('app').controller('AccountChangeController', AccountChange);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
