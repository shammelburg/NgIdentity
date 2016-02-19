module app.controllers {
    class AccountEdit {
        model: any;
        message: string;
        isSuccess: boolean;

        static $inject = ['accountService', '$state', '$log'];
        constructor(private accountService: app.services.IAccountService, private $state, private $log) {
            this.isSuccess = false;
            this.message = '';
            this.GetUser();
        }

        UpdateAccount(vm: any): void {
            this.accountService.UpdateUserInfo(vm).then((response: any) => {
                this.isSuccess = true;
                this.message = response.data;
                this.GetUser();
            });
        };

        private GetUser(): void {
            this.accountService.UserInfo().then((response: any) => { this.model = response.data; });
        };
    }
    angular.module('app').controller('AccountEditController', AccountEdit);
}