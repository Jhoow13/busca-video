(function(){
    'use strict';

    angular.module('appModelo').config(['$routeProvider', '$locationProvider',
             function($routeProvider, $locationProvider) {

            $routeProvider
            .when('/', {
                templateUrl: 'app/views/inicio.html',
                controller: 'inicioController'
            })

            .otherwise({redirectTo: '/'});


            $locationProvider.hashPrefix('');

        }]);
})();

