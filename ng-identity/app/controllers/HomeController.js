var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var Home = (function () {
            function Home() {
            }
            return Home;
        })();
        controllers.Home = Home;
        angular.module("app").controller("HomeController", Home);
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
