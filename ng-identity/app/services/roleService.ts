module app.services {
    export interface IRoleService {
        Get(): ng.IHttpPromise<any>;
        Add(roleName: string): ng.IHttpPromise<any>;
        Delete(roleName: string): ng.IHttpPromise<any>;
    }

    class Role implements IRoleService {
        webApiUrl: string;
        config: any;

        static $inject = ['$http', 'localStorageService'];
        constructor(private $http: ng.IHttpService, private localStorageService) {
            var api = new Common.Api(localStorageService);
            this.webApiUrl = api.WebAPIUrl();
            this.config = api.Config();
        }

        Get(): ng.IHttpPromise<any> {
            return this.$http.get(this.webApiUrl + 'api/Role/Get', this.config);
        };
        Add(roleName: string): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Role/Post?Name=' + roleName, this.config);
        };
        Delete(roleName: string): ng.IHttpPromise<any> {
            return this.$http.post(this.webApiUrl + 'api/Role/Delete?Name=' + roleName, this.config);
        };
    }

    angular.module('app').service('roleService', Role);
}
