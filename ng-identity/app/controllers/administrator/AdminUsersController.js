var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AdminUsers = (function () {
            function AdminUsers(userService, authService) {
                var _this = this;
                this.userService = userService;
                this.authService = authService;
                this.authService.Check(['Admin']);
                this.viewBy = 15;
                this.currentPage = 1;
                this.itemsPerPage = this.viewBy;
                this.maxSize = 5; //Number of pager buttons to show
                this.userService.Get().then(function (response) {
                    _this.users = response.data;
                    _this.totalItems = response.data.length;
                });
            }
            AdminUsers.$inject = ['userService', 'authService'];
            return AdminUsers;
        })();
        angular.module('app').controller('AdminUsersController', AdminUsers);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
