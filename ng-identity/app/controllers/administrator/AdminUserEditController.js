var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var UserEdit = (function () {
            function UserEdit($scope, $stateParams, authService, userService, roleService, $log, $timeout) {
                var _this = this;
                this.$scope = $scope;
                this.$stateParams = $stateParams;
                this.authService = authService;
                this.userService = userService;
                this.roleService = roleService;
                this.$log = $log;
                this.$timeout = $timeout;
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
                    this.roleService.Get().then(function (response) { _this.roles = response.data; }).catch(this.OnRoleError);
                }
            }
            UserEdit.prototype.GetUserData = function (Id) {
                var _this = this;
                this.userService.GetUser(Id).then(function (response) { _this.user = response.data; }).catch(function (reason) { _this.userMessage = reason; });
            };
            ;
            UserEdit.prototype.GetRoleData = function (Id) {
                var _this = this;
                this.userService.UserRoles(Id).then(function (response) { _this.uroles = response.data; }).catch(this.OnRoleError);
            };
            ;
            UserEdit.prototype.UpdateUser = function (vm) {
                var _this = this;
                this.userService.UpdateUser(vm).then(function () {
                    _this.userMessage = 'Successfully updated.';
                    _this.isUserSuccess = true;
                    _this.GetUserData(_this.$stateParams.Id);
                    _this.$timeout(function () { this.userMessage = ''; }, 3000);
                }).catch(function (reason) { _this.userMessage = reason; });
            };
            ;
            UserEdit.prototype.AddRole = function (roleName) {
                var _this = this;
                if (!roleName) {
                    this.roleMessage = 'Please a role.';
                    this.RoleTimer();
                    return;
                }
                this.userService.AddUserRoles({ Id: this.$stateParams.Id, RoleName: roleName }).then(function () {
                    _this.role = {};
                    _this.roleMessage = 'Successfully added.';
                    _this.isRoleSuccess = true;
                    _this.GetRoleData(_this.$stateParams.Id);
                    _this.GetUserData(_this.$stateParams.Id);
                    _this.RoleTimer();
                }).catch(this.OnRoleError);
            };
            ;
            UserEdit.prototype.RemoveRole = function (roleName) {
                var _this = this;
                this.userService.RemoveUserRoles({ Id: this.$stateParams.Id, RoleName: roleName }).then(function () {
                    _this.roleMessage = 'Successfully removed.';
                    _this.isRoleSuccess = true;
                    _this.GetRoleData(_this.$stateParams.Id);
                    _this.GetUserData(_this.$stateParams.Id);
                    _this.RoleTimer();
                }).catch(this.OnRoleError);
            };
            ;
            UserEdit.prototype.ResetPassword = function (reset) {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.resetForm.$invalid)
                    return;
                var vm = angular.extend({ Id: this.$stateParams.Id }, reset);
                this.userService.ResetPassword(vm).then(function () {
                    _this.reset = {};
                    _this.resetMessage = 'Successfully reset password.';
                    _this.isResetSuccess = true;
                    _this.$timeout(function () { this.resetMessage = ''; }, 3000);
                }).catch(function (reason) { _this.resetMessage = reason; });
            };
            ;
            UserEdit.prototype.OnRoleError = function (reason) {
                this.roleMessage = reason;
            };
            ;
            UserEdit.prototype.RoleTimer = function () {
                var _this = this;
                this.$timeout(function () { _this.roleMessage = ''; }, 3000);
            };
            ;
            UserEdit.$inject = ['$scope', '$stateParams', 'authService', 'userService', 'roleService', '$log', '$timeout'];
            return UserEdit;
        })();
        angular.module('app').controller('AdminUserEditController', UserEdit);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
