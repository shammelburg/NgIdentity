module app.services {
    export interface IUserService {
        Get(): ng.IHttpPromise<any>;
        GetUser(Id: string): ng.IHttpPromise<any>;
        UpdateUser(vm: any): ng.IHttpPromise<any>;
        ResetPassword(vm: any): ng.IHttpPromise<any>;
        UserRoles(Id: string): ng.IHttpPromise<any>;
        AddUserRoles(vm: any): ng.IHttpPromise<any>;
        RemoveUserRoles(vm: any): ng.IHttpPromise<any>;
    }

    class User implements IUserService {
        webApiUrl: string;
        config: {};

        static $inject = ['$http','localStorageService'];
        constructor(private $http: ng.IHttpService, private localStorageService) {
            var api = new Common.Api(localStorageService);
            this.webApiUrl = api.WebAPIUrl();
            this.config = api.Config();
        }

        Get(): ng.IHttpPromise<any> {
            return this.$http.get(this.webApiUrl + 'api/User/Get', this.config);
        };
        GetUser(Id: string): ng.IHttpPromise<any> {
            return this.$http.get(this.webApiUrl + 'api/User/GetUser?Id=' + Id, this.config);
        };
        UpdateUser(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/User/UpdateUser', vm, this.config);
        };
        ResetPassword(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/User/ResetPassword', vm, this.config);
        };
        UserRoles(Id: string): ng.IHttpPromise<any> {
            return this.$http.get(this.webApiUrl + 'api/User/GetUserRoles?Id=' + Id, this.config);
        };
        AddUserRoles(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/User/AddToRole', vm, this.config);
        };
        RemoveUserRoles(vm: any): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/User/RemoveFromRole', vm, this.config);
        };
    }

    angular.module('app').service('userService', User);
}