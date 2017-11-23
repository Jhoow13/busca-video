(function(){
    'use strict';

    angular.module('buscaVideo').controller('inicialController',
               ['$scope','applicationModel','searchHttpServices',
        function($scope,applicationModel,searchHttpServices){

            $scope.search_field = '';

            $scope.search = function(search_field){
                searchHttpServices.defaultRequest(search_field).then(function(response){
                    var pageInfo = response.data.pageInfo;
                    $scope.nextPage = response.data.nextPageToken
                    $scope.totalPages = Math.ceil(pageInfo.totalResults/10);
                    $scope.currentPage = 1;
                    $scope.searchResults = applicationModel.searchResultModel(response.data.items);
                });
            }

            $scope.getPage = function(pageToken, pageControl){
                searchHttpServices.pageRequest($scope.search_field, pageToken).then(function(response){
                    $scope.nextPage = response.data.nextPageToken;
                    $scope.prevPage = response.data.prevPageToken;
                    $scope.searchResults = applicationModel.searchResultModel(response.data.items);
                    pageControl ? $scope.currentPage = $scope.currentPage + 1 : $scope.currentPage = $scope.currentPage - 1;
                });
            }

            $scope.videoDetails = function(videoId){
                searchHttpServices.videoDetailsRequest(videoId).then(function(response){
                    $scope.details = applicationModel.videoDetailsModel(response.data.items);
                });
            }

        }]);
})();