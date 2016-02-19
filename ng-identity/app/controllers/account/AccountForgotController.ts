module app.controllers {

    class AccountForgot {
        message: string;
        isSuccess: boolean;
        model: any;

        static $inject = ['$scope', 'accountService', '$timeout', '$location'];
        constructor(private $scope, private accountService: app.services.IAccountService, private $timeout, private $location: ng.ILocationService) {
            this.message = '';
            this.isSuccess = false;
        }

        SendLink(vm: any): void {
            this.$scope.$broadcast('show-errors-event');
            if (this.$scope.forgotForm.$invalid)
                return;

            this.accountService.Forgot(vm).then((response: any) => {
                this.model = {};
                this.isSuccess = true;
                this.message = response.data + ' You will be redirected to the sign in page in 3 seconds.';
                this.$timeout(() => {
                    this.$location.path('/signin');
                }, 3000);
            }).catch((reason: any) => { this.message = reason.data.Message + ' Please check your email address and try again.'; });
        };
    }

    angular.module('app').controller('AccountForgotController', AccountForgot);
}