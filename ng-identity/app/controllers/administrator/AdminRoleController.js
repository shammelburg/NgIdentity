var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var Role = (function () {
            function Role($scope, $log, roleService, authService) {
                this.$scope = $scope;
                this.$log = $log;
                this.roleService = roleService;
                this.authService = authService;
                this.authService.Check(['Admin']);
                this.GetRoles();
            }
            Role.prototype.RemoveRole = function (role) {
                var _this = this;
                this.roleService.Delete(role.Name).then(function () { _this.GetRoles(); });
            };
            ;
            Role.prototype.AddRole = function (role) {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.userForm.$invalid)
                    return;
                this.roleService.Add(role.name).then(function () { _this.GetRoles(); });
                this.role = {};
            };
            ;
            Role.prototype.GetRoles = function () {
                var _this = this;
                this.roleService.Get().then(function (response) { _this.roles = response.data; });
            };
            ;
            Role.$inject = ['$scope', '$log', 'roleService', 'authService'];
            return Role;
        })();
        angular.module('app').controller('AdminRoleController', Role);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
