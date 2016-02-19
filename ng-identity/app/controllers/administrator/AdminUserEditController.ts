module app.controllers {

    interface IParams extends ng.ui.IStateParamsService {
        Id: string;
    }

    interface IUserEdit {
        user: any;
        userMessage: string;
        isUserSuccess: boolean;
        uroles: any;
        roleMessage: string;
        isRoleSuccess: boolean;
        role: any;
        roles: any;
        reset: any;
        resetMessage: string;
        isResetSuccess: boolean;
        GetUserData(Id: string): void;
        GetRoleData(Id: string): void;
        UpdateUser(vm: any): void;
        AddRole(roleName: string): void;
    }

    class UserEdit implements IUserEdit {
        user: any;
        userMessage: string;
        isUserSuccess: boolean;
        uroles: any;
        roleMessage: string;
        isRoleSuccess: boolean;
        role: any;
        roles: any;
        reset: any;
        resetMessage: string;
        isResetSuccess: boolean;

        static $inject = ['$scope', '$stateParams', 'authService', 'userService', 'roleService', '$log', '$timeout'];
        constructor(private $scope: any,
            private $stateParams: IParams,
            private authService: app.services.IAuthService,
            private userService: app.services.IUserService,
            private roleService: app.services.IRoleService,
            private $log: ng.ILogService,
            private $timeout: ng.ITimeoutService) {
            
            // check for permissions
            this.authService.Check(['Admin']);

            // set default values
            this.userMessage = '';
            this.isUserSuccess = false;
            this.roleMessage = '';
            this.isRoleSuccess = false;
            this.resetMessage = '';
            this.isResetSuccess = false;

            var Id = $stateParams.Id;
            if (Id) {
                this.GetUserData(Id);
                this.GetRoleData(Id);
                this.roleService.Get().then((response) => { this.roles = response.data; }).catch(this.OnRoleError);
            }
        }

        GetUserData(Id: string): void {
            this.userService.GetUser(Id).then((response: any) => { this.user = response.data; }).catch((reason: any) => { this.userMessage = reason; });
        };
        GetRoleData(Id: string): void {
            this.userService.UserRoles(Id).then((response: any) => { this.uroles = response.data; }).catch(this.OnRoleError);
        };
        UpdateUser(vm: any): void {
            this.userService.UpdateUser(vm).then(() => {
                this.userMessage = 'Successfully updated.';
                this.isUserSuccess = true;
                this.GetUserData(this.$stateParams.Id);
                this.$timeout(function () { this.userMessage = ''; }, 3000);
            }).catch((reason: any) => { this.userMessage = reason; });
        };
        AddRole(roleName: string): void {
            if (!roleName) {
                this.roleMessage = 'Please a role.';
                this.RoleTimer();
                return;
            }

            this.userService.AddUserRoles({ Id: this.$stateParams.Id, RoleName: roleName }).then(() => {
                this.role = {};
                this.roleMessage = 'Successfully added.';
                this.isRoleSuccess = true;
                this.GetRoleData(this.$stateParams.Id);
                this.GetUserData(this.$stateParams.Id);
                this.RoleTimer();
            }).catch(this.OnRoleError);
        };
        RemoveRole(roleName: string): void {
            this.userService.RemoveUserRoles({ Id: this.$stateParams.Id, RoleName: roleName }).then(() => {
                this.roleMessage = 'Successfully removed.';
                this.isRoleSuccess = true;
                this.GetRoleData(this.$stateParams.Id);
                this.GetUserData(this.$stateParams.Id);
                this.RoleTimer();
            }).catch(this.OnRoleError);
        };
        ResetPassword(reset: any): void {
            this.$scope.$broadcast('show-errors-event');
            if (this.$scope.resetForm.$invalid)
                return;

            var vm: any = angular.extend({ Id: this.$stateParams.Id }, reset);
            this.userService.ResetPassword(vm).then(() => {
                this.reset = {};
                this.resetMessage = 'Successfully reset password.';
                this.isResetSuccess = true;
                this.$timeout(function () { this.resetMessage = ''; }, 3000);
            }).catch((reason: any) => { this.resetMessage = reason; });
        };
        OnRoleError(reason): void {
            this.roleMessage = reason;
        };
        RoleTimer(): void {
            this.$timeout(() => { this.roleMessage = ''; }, 3000);
        };
    }

    angular.module('app').controller('AdminUserEditController', UserEdit);
}