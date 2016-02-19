module app.controllers {

    class AccountCreate {
        model: any;
        message: string;
        isSuccess: boolean;

        static $inject = ['$scope', '$location', '$timeout', '$log', 'authService'];
        constructor(private $scope, private $location, private $timeout, private $log, private authService: app.services.IAuthService) {
            this.isSuccess = false;
            this.message = '';
        }

        CreateAccount(vm: any): void {
            this.$scope.$broadcast('show-errors-event');
            if (this.$scope.createForm.$invalid)
                return;

            this.authService.Registration(vm).then((response: any) => {
                this.model = {};
                this.isSuccess = true;
                this.message = "User has been registered successfully, a confirmation email has been sent.";
                this.$timeout(() => {
                    this.isSuccess = false;
                    this.message = '';
                }, 3000);
            }).catch((reason: any) => {
                this.$log.debug(reason.data);

                if (reason.data.ModelState) {
                    var errors = [];
                    for (var key in reason.data.ModelState) {
                        for (var i = 0; i < reason.data.ModelState[key].length; i++) {
                            errors.push(reason.data.ModelState[key][i]);
                        }
                    }
                    this.message = "Failed to register user due to:" + errors.join(' ');
                }
                else {
                    this.message = reason.data;
                }
            });
        };
    }

    angular.module('app').controller('AdminCreateController', AccountCreate);
}