var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AccountConfirmEmail = (function () {
            function AccountConfirmEmail(accountService, $stateParams, $timeout, $state) {
                var _this = this;
                this.accountService = accountService;
                this.$stateParams = $stateParams;
                this.$timeout = $timeout;
                this.$state = $state;
                var u = this.$stateParams.u;
                var t = this.$stateParams.t;
                if (u && t) {
                    accountService.ConfirmEmail(u, t).then(function () {
                        _this.confirmed = true;
                        _this.message = 'Your email address has been confirmed. You are being redirected to your account in 3 seconds.';
                        $timeout(function () { $state.go('account'); }, 3000);
                    }).catch(function (reason) {
                        var errors = [];
                        if (reason.data.ModelState) {
                            for (var key in reason.data.ModelState) {
                                for (var i = 0; i < reason.data.ModelState[key].length; i++) {
                                    errors.push(reason.data.ModelState[key][i]);
                                }
                            }
                        }
                        else {
                            errors.push(reason.data.ExceptionMessage);
                        }
                        _this.confirmed = false;
                        _this.message = errors.join(' ');
                    });
                }
            }
            AccountConfirmEmail.$inject = ['accountService', '$stateParams', '$timeout', '$state'];
            return AccountConfirmEmail;
        })();
        angular.module('app').controller('AccountConfirmEmailController', AccountConfirmEmail);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=AccountConfirmEmailController.js.map