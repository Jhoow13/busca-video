(function(){
    'use strict';

    angular.module('buscaVideo').config(['$routeProvider', '$locationProvider',
             function($routeProvider, $locationProvider) {

            $routeProvider
            .when('/', {
                templateUrl: 'app/views/inicial.html',
                controller: 'inicialController'
            })

            .otherwise({redirectTo: '/'});


            $locationProvider.hashPrefix('');

        }]);
})();

