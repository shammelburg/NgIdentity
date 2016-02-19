module app.services {
    export interface IAccountService {
        Forgot(vm: any): ng.IHttpPromise<any>;
        ConfirmEmail(id: string, token: string): ng.IHttpPromise<any>;
        ResetPassword(vm: any): ng.IHttpPromise<any>;
        SendConfirmationEmail(): ng.IHttpPromise<any>;
        ChangePassword(vm: any): ng.IHttpPromise<any>;
        UserInfo(): ng.IHttpPromise<any>;
        UpdateUserInfo(vm: any): ng.IHttpPromise<any>;
    }

    class Account implements IAccountService {
        webApiUrl: string;
        config: {};

        static $inject = ['$http','localStorageService'];
        constructor(private $http: ng.IHttpService, private localStorageService) {
            let api = new Common.Api(localStorageService);
            this.webApiUrl = api.WebAPIUrl();
            this.config = api.Config();         
        }

        Forgot(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Account/ForgotPassword', vm);
        };
        ConfirmEmail(id: string, token: string): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Account/ConfirmEmail?u=' + id + '&t=' + token, null);
        };
        ResetPassword(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Account/ResetPassword', vm);
        };
        SendConfirmationEmail(): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Account/SendConfirmationEmail', null, this.config);
        };
        ChangePassword(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Account/ChangePassword', vm, this.config);
        };
        UserInfo(): ng.IHttpPromise<any> {
            return this.$http.get(this.webApiUrl + 'api/Account/GetUserInfo', this.config);
        };
        UpdateUserInfo(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Account/UpdateUserInfo', vm, this.config);
        };
    }

    angular.module('app').service('accountService', Account);
}
