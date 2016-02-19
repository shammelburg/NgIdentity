//module app.directives {

//    export class FormValidation implements ng.IDirective {
//        static $inject = ['$timeout'];
//        constructor(private $timeout: ng.ITimeoutService) {
//            return this.CreateDirective($timeout);
//        }

//        private CreateDirective($timeout): any {
//            return {
//                this: (scope: ng.IScope, el, attrs, formCtrl) => {
//                    var inputEl = el[0].querySelector("[name]");

//                    var inputNgEl = angular.element(inputEl);

//                    var inputName = inputNgEl.attr('name');

//                    var helpText = angular.element(el[0].querySelector(".help-block"));

//                    inputNgEl.bind('blur', () => {
//                        el.toggleClass('has-error', formCtrl[inputName].$invalid);
//                        //helpText.toggleClass('hide', formCtrl[inputName].$valid);
//                    });


//                    // $scope.$broadcast('show-errors-event'); in controller submit function
//                    scope.$on('show-errors-event', () => {
//                        el.toggleClass('has-error', formCtrl[inputName].$invalid);
//                    });

//                    // $scope.$broadcast('hide-errors-event'); in controller submit function
//                    scope.$on('hide-errors-event', () => {
//                        this.$timeout(() => {
//                            el.removeClass('has-error');
//                        }, 0, false);
//                    });
//                }
//            }
//        }
//    }

//    angular.module('app').directive('formValidation', [FormValidation]);
//}
(function () {
    angular.module('app').directive('showError', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {

                var inputEl = el[0].querySelector("[name]");

                var inputNgEl = angular.element(inputEl);

                var inputName = inputNgEl.attr('name');

                var helpText = angular.element(el[0].querySelector(".help-block"));

                inputNgEl.bind('blur', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    //helpText.toggleClass('hide', formCtrl[inputName].$valid);
                });


                // $scope.$broadcast('show-errors-event'); in controller submit function
                scope.$on('show-errors-event', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                });

                // $scope.$broadcast('hide-errors-event'); in controller submit function
                scope.$on('hide-errors-event', function () {
                    $timeout(function () {
                        el.removeClass('has-error');
                    }, 0, false);
                });
            }
        }
    }]);
} ());