var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var AccountCreate = (function () {
            function AccountCreate($scope, $location, $timeout, $log, authService) {
                this.$scope = $scope;
                this.$location = $location;
                this.$timeout = $timeout;
                this.$log = $log;
                this.authService = authService;
                this.isSuccess = false;
                this.message = '';
            }
            AccountCreate.prototype.CreateAccount = function (vm) {
                var _this = this;
                this.$scope.$broadcast('show-errors-event');
                if (this.$scope.createForm.$invalid)
                    return;
                this.authService.Registration(vm).then(function (response) {
                    _this.model = {};
                    _this.isSuccess = true;
                    _this.message = "User has been registered successfully, a confirmation email has been sent.";
                    _this.$timeout(function () {
                        _this.isSuccess = false;
                        _this.message = '';
                    }, 3000);
                }).catch(function (reason) {
                    _this.$log.debug(reason.data);
                    if (reason.data.ModelState) {
                        var errors = [];
                        for (var key in reason.data.ModelState) {
                            for (var i = 0; i < reason.data.ModelState[key].length; i++) {
                                errors.push(reason.data.ModelState[key][i]);
                            }
                        }
                        _this.message = "Failed to register user due to:" + errors.join(' ');
                    }
                    else {
                        _this.message = reason.data;
                    }
                });
            };
            ;
            AccountCreate.$inject = ['$scope', '$location', '$timeout', '$log', 'authService'];
            return AccountCreate;
        })();
        angular.module('app').controller('AdminCreateController', AccountCreate);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
//# sourceMappingURL=AdminCreateController.js.map