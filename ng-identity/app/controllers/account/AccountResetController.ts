module app.controllers {

    interface IParams extends ng.ui.IStateParamsService {
        c: string; // Code
        u: string; // UserId
    }

    class Reset {
        message: string;
        user: any;
        isSuccess: boolean;

        static $inject = ['$scope', '$log', '$state', 'accountService', '$stateParams', '$timeout'];
        constructor(private $scope, private $log, private $state, private accountService: app.services.IAccountService, private $stateParams: IParams, private $timeout: ng.ITimeoutService) {
            if (!this.$stateParams.u || !this.$stateParams.c) {
                this.message = 'An error occurred. Please send yourself another email with the link and try again.';
            }

            this.isSuccess = false;
        }

        Reset(user: any): void {
            this.$scope.$broadcast('show-errors-event');
            if (this.$scope.resetForm.$invalid)
                return;

            var model = { Code: this.$stateParams.c, Id: this.$stateParams.u, Password: user.password };
            this.accountService.ResetPassword(model).then((response: any) => {
                this.user = {};
                this.isSuccess = true;
                this.message = response.data + ' You will be redirected in 3 seconds.';
                this.$timeout(function () {
                    this.$state.go('account-signin');
                }, 3000);
            }).catch((reason: any) => { this.message = reason.data.Message; });
        };
    }
    angular.module('app').controller('AccountResetController', Reset);
}
