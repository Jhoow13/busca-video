(function(){
    'use strict';

    angular.module('buscaVideo').config(['$routeProvider', '$locationProvider',
             function($routeProvider, $locationProvider) {

            $routeProvider
            .when('/', {
                templateUrl: 'app/views/inicial.html',
                controller: 'inicialController'
            })

            .when('/details',{
                templateUrl: 'app/views/details.html',
                controller: 'detailsController'
            })

            .otherwise({redirectTo: '/'});


            $locationProvider.hashPrefix('');

        }]);
})();

