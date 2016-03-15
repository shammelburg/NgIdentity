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

        static $inject = ['$scope', '$state', '$log', 'authService', '$window'];
        constructor(private $scope, private $state: ng.ui.IStateService, private $log: ng.ILogService, private authService: app.services.IAuthService, private $window: ng.IWindowService) {

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
                // cause the page post back, sets auth header
                this.$window.location.href = '/myaccount';
                // cause weird auth error for certain controllers methods                
                //this.$state.go('account');
            }).catch((reason: any) => {
                this.message = reason.error_description;
            });
        };
    }

    angular.module('app').controller('AccountSignInController', SignIn);
}