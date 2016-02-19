module app.controllers {

    interface IIndexModel {
        ForceSSL(): void;
        LogOut(): void;
        authentication: any;
    }

    export class Index implements IIndexModel {
        authentication: any;

        static $inject = ['$location', '$window', 'authService'];
        constructor(private $location, private $window: ng.IWindowService, private authService: app.services.IAuthService) {
            this.authentication = authService.authentication;
        }

        ForceSSL(): void {
            if (this.$location.protocol() !== 'https') {
                this.$window.location.href = this.$location.absUrl().replace('http', 'https');
            }
        };
        LogOut(): void {
            this.authService.Logout();
            this.$window.location.href = '/home';
        };
    }

    angular.module('app').controller('IndexController', Index);
}