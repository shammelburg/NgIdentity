module app.controllers {

    interface IParams extends ng.ui.IStateParamsService {
        u: string; // UserId
        t: string; // Token
    }

    class AccountConfirmEmail {
        confirmed: boolean;
        message: string;

        static $inject = ['accountService', '$stateParams', '$timeout', '$state'];
        constructor(private accountService: app.services.IAccountService, private $stateParams: IParams, private $timeout, private $state) {

            var u = this.$stateParams.u;
            var t = this.$stateParams.t;

            if (u && t) {
                accountService.ConfirmEmail(u, t).then(() => {
                    this.confirmed = true;
                    this.message = 'Your email address has been confirmed. You are being redirected to your account in 3 seconds.';
                    $timeout(function () { $state.go('account'); }, 3000);
                }).catch((reason: any) => {
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
                    this.confirmed = false;
                    this.message = errors.join(' ');
                });
            }
        }
    }
    angular.module('app').controller('AccountConfirmEmailController', AccountConfirmEmail);
}