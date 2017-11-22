(function(){
    'use strict';
    angular.module('buscaVideo')
        .factory('searchHttpServices', ['$http', function ($http){
            var _defaultRequest = function(){
                return $http({
                    method: 'GET',
                    url: ''
                });
            };

            return {
                _defaultRequest: defaultRequest
            };

        }]);
}());