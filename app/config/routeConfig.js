(function(){
    'use strict';

    angular.module('buscaVideo').config(['$routeProvider', '$locationProvider',
             function($routeProvider, $locationProvider) {

            $routeProvider
            .when('/', {
                templateUrl: 'src/html/inicial.html',
                controller: 'inicialController'
            })

            .when('/details',{
                templateUrl: 'src/html/details.html',
                controller: 'detailsController'
            })

            .otherwise({redirectTo: '/'});


            $locationProvider.hashPrefix('');

        }]);
})();

