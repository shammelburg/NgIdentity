module app.controllers {
    class Account {
        user: any;
        message: string;

        static $inject = ['accountService', 'authService', '$timeout'];
        constructor(private accountService: app.services.IAccountService, private authService: app.services.IAuthService, private $timeout: ng.ITimeoutService) {
            this.authService.Check(['Admin']);
            this.message = 'Email not confirmed';
            this.accountService.UserInfo().then((response: any) => { this.user = response.data; }).catch(Common.Error.prototype.LogError);
        }

        SendConfirmation(): void {
            this.accountService.SendConfirmationEmail().then(() => {
                this.message = 'Email sent';
                this.$timeout(function () {
                    this.message = 'Email not confirmed';
                }, 5000);
            }).catch(Common.Error.prototype.LogError);
        };
    }
    angular.module('app').controller('AccountController', Account);
}
