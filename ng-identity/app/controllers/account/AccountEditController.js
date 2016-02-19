var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AccountEdit = (function () {
            function AccountEdit(accountService, $state, $log) {
                this.accountService = accountService;
                this.$state = $state;
                this.$log = $log;
                this.isSuccess = false;
                this.message = '';
                this.GetUser();
            }
            AccountEdit.prototype.UpdateAccount = function (vm) {
                var _this = this;
                this.accountService.UpdateUserInfo(vm).then(function (response) {
                    _this.isSuccess = true;
                    _this.message = response.data;
                    _this.GetUser();
                });
            };
            ;
            AccountEdit.prototype.GetUser = function () {
                var _this = this;
                this.accountService.UserInfo().then(function (response) { _this.model = response.data; });
            };
            ;
            AccountEdit.$inject = ['accountService', '$state', '$log'];
            return AccountEdit;
        })();
        angular.module('app').controller('AccountEditController', AccountEdit);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
