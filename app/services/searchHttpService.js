(function(){
    'use strict';
    angular.module('appModelo')
        .factory('infoHttpServices', ['$http', function ($http){
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