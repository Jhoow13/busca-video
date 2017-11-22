(function(){
    'use strict';

    angular.module('buscaVideo').controller('inicialController',
               ['$scope','searchHttpServices',
        function($scope,searchHttpServices){

            $scope.search = function(search_field){
                searchHttpServices.defaultRequest(search_field).then(function(response){

                    $scope.searchResults = response.data.items;
                });
            }


        }]);

})();