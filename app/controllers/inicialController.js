(function(){
    'use strict';

    angular.module('buscaVideo').controller('inicialController',
               ['$scope','searchHttpServices',
        function($scope,searchHttpServices){

            $scope.search_field = '';
            $scope.searchResults = [];

            $scope.search = function(search_field){
                searchHttpServices.defaultRequest(search_field).then(function(response){
                    var pageInfo = response.data.pageInfo;
                    $scope.nextPage = response.data.nextPageToken
                    $scope.totalPages = Math.ceil(pageInfo.totalResults/10);
                    $scope.currentPage = 1;
                    $scope.searchResults = response.data.items;
                });
            }

            $scope.getPage = function(pageToken, pageControl){
                console.log(pageToken);
                searchHttpServices.pageRequest($scope.search_field, pageToken).then(function(response){
                    $scope.searchResults = response.data.items;
                    $scope.nextPage = response.data.nextPageToken;
                    $scope.prevPage = response.data.prevPageToken;

                    pageControl ? $scope.currentPage = $scope.currentPage + 1 : $scope.currentPage = $scope.currentPage - 1;

                });
            }
        }]);
})();