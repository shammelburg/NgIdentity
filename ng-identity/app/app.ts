module app {
    class Config {
        static $inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$logProvider'];
        constructor($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider, $logProvider: ng.ILogProvider) {
            $stateProvider
                .state('home', { url: '/', controller: 'HomeController', templateUrl: '/app/views/home.html' })
                /*Account Routes*/
                .state('account', { url: '/myaccount', controller: 'AccountController as vm', templateUrl: '/app/views/account/account-user.html' })
                .state('account-edit', { url: '/myaccount/edit', controller: 'AccountEditController as vm', templateUrl: '/app/views/account/account-edit.html' })
                .state('account-change', { url: '/myaccount/change-password', controller: 'AccountChangeController as vm', templateUrl: '/app/views/account/account-change.html' })
                .state('account-signin', { url: '/signin', controller: 'AccountSignInController as vm', templateUrl: '/app/views/account/account-signin.html' })
                .state('account-create', { url: '/create-account', controller: 'AccountCreateController as vm', templateUrl: '/app/views/account/account-create.html' })
                .state('account-forgot', { url: '/forgot-password', controller: 'AccountForgotController as vm', templateUrl: '/app/views/account/account-forgot.html' })
                .state('account-reset', { url: '/reset-password?:u&:c', controller: 'AccountResetController as vm', templateUrl: '/app/views/account/account-reset.html' })
                .state('account-confirm-email', { url: '/confirm-email?:u&:t', controller: 'AccountConfirmEmailController as vm', templateUrl: '/app/views/account/confirm-email.html' })
                /*Admin Routes*/
                .state('admin', { url: '/administrator', controller: '', templateUrl: '/app/views/administrator/admin.html' })
                .state('admin-create', { url: '/administrator/create', controller: 'AdminCreateController as vm', templateUrl: '/app/views/administrator/admin-create.html' })
                .state('admin-users', { url: '/administrator/users', controller: 'AdminUsersController as vm', templateUrl: '/app/views/administrator/admin-users.html' })
                .state('admin-user-edit', { url: '/administrator/user/edit/:Id', controller: 'AdminUserEditController as vm', templateUrl: '/app/views/administrator/admin-user-edit.html' })
                .state('admin-roles', { url: '/administrator/roles', controller: 'AdminRoleController as vm', templateUrl: '/app/views/administrator/admin-roles.html' });

            $logProvider.debugEnabled(true);
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('authInterceptorService');
            $urlRouterProvider.otherwise('/signin');
        }
    }

    class Run {
        static $inject = ['authService'];
        constructor(authService: app.services.IAuthService) {
            authService.SetAuthData();
        }
    }

    angular.module('app', ['blockUI', 'ui.router', 'LocalStorageModule', 'ui.bootstrap']);
    angular.module('app').run(Run);
    angular.module('app').config(Config);
}

module Common {
    export class Api {
        static $inject = ['localStorageService'];
        constructor(private localStorageService) { }

        WebAPIUrl(): string {
            //return 'http://ng-identity-webapi.azurewebsites.net/';
            return 'http://localhost:50560/';
        };

        Config(): {} {
            var auth = {};
            var ls = this.localStorageService.get('authorizationData');
            if (ls)
                auth = { headers: { Authorization: "Bearer " + ls.token } };

            return auth;
        }
    }
    export class Error {

        static $inject = ['$log'];
        constructor(private $log: ng.ILogService) { }

        LogError(reason: any): void {
            console.log(reason);
        }
    }
}