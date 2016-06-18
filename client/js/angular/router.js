angular.
    module('gato.steam').config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/home.html'
            }).otherwise('/');;
        }
    ]);