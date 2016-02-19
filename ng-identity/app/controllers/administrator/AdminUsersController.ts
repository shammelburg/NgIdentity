module app.controllers {
    interface IAdminUsers {
        currentPage: number;
        itemsPerPage: number;
        maxSize: number;
        viewBy: number;
        totalItems: number;
        users: any;
    }

    class AdminUsers implements IAdminUsers {
        currentPage: number;
        itemsPerPage: number;
        maxSize: number;
        viewBy: number;
        totalItems: number;
        users: any;

        static $inject = ['userService', 'authService'];
        constructor(private userService: app.services.IUserService, private authService: app.services.IAuthService) {
            this.authService.Check(['Admin']);

            this.viewBy = 15;

            this.currentPage = 1;
            this.itemsPerPage = this.viewBy;
            this.maxSize = 5; //Number of pager buttons to show

            this.userService.Get().then((response: any) => {
                this.users = response.data;
                this.totalItems = response.data.length;
            });
        }
    }

    angular.module('app').controller('AdminUsersController', AdminUsers);
}