module app.controllers {
    interface IRole {
        role: any;
        roles: any;
        GetRoles(): void;
        AddRole(role: any): void;
        RemoveRole(role: any): void;
    }

    class Role implements IRole {
        roles: any;
        role: any;

        static $inject = ['$scope', '$log', 'roleService', 'authService'];
        constructor(private $scope, private $log, private roleService: app.services.IRoleService, private authService: app.services.IAuthService) {
            this.authService.Check(['Admin']);
            this.GetRoles();
        }

        RemoveRole(role: any): void {
            this.roleService.Delete(role.Name).then(() => { this.GetRoles(); });
        };
        AddRole(role: any): void {
            this.$scope.$broadcast('show-errors-event');

            if (this.$scope.userForm.$invalid)
                return;

            this.roleService.Add(role.name).then(() => { this.GetRoles(); });
            this.role = {};
        };

        GetRoles(): void {
            this.roleService.Get().then((response: any) => { this.roles = response.data; });
        };
    }

    angular.module('app').controller('AdminRoleController', Role);
}