module app.controllers {

    class AccountChange {
        message: string;
        isSuccess: boolean;
        model: any;

        static $inject = ['$scope', '$log', '$state', 'accountService'];
        constructor(private $scope, private $log, private $state, private accountService: app.services.IAccountService) { }

        ChangePassword(model: any): void {
            this.$scope.$broadcast('show-errors-event');
            if (this.$scope.changeForm.$invalid)
                return;

            console.log(model);
            this.accountService.ChangePassword(model).then((response: any) => {
                this.model = {};
                this.message = response.data;
                this.isSuccess = true;
            }).catch((reason: any) => { this.message = reason.data.Message; });
        };

        something = () => { };
        Somthing(): void { };
    }
    angular.module('app').controller('AccountChangeController', AccountChange);
}