module app.controllers {

    export interface ILoginData {
        userName: string;
        password: string;
    }

    interface ISignIn {
        loginData: ILoginData;
        message: string;
        SignIn(): void;
    }

    class SignIn implements ISignIn {
        loginData: ILoginData;
        message: string;

        static $inject = ['$scope', '$state', '$log', 'authService'];
        constructor(private $scope, private $state: ng.ui.IStateService, private $log: ng.ILogService, private authService: app.services.IAuthService) {

            this.message = '';
            this.loginData = {
                userName: '',
                password: ''
            };

            authService.Logout();
        }

        SignIn(): void {
            this.$scope.$broadcast('show-errors-event');
            if (this.$scope.loginForm.$invalid)
                return;

            this.authService.Login(this.loginData).then(() => {
                this.$state.go('account');
            }).catch((reason: any) => {
                this.message = reason.error_description;
            });
        };
    }

    angular.module('app').controller('AccountSignInController', SignIn);
}