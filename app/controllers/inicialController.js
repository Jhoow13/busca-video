(function(){
    'use strict';

    angular.module('buscaVideo').controller('inicialController',
               ['$scope','$location','$window','applicationModel','searchHttpServices',
        function($scope,$location,$window,applicationModel,searchHttpServices){

            $scope.search_field = sessionStorage.getItem('termoPesquisa') || '';
            $scope.searchResults = JSON.parse(sessionStorage.getItem('listaVideos'));
            $scope.totalPages = sessionStorage.getItem('totalPaginas');
            $scope.currentPage = sessionStorage.getItem('paginaAtual');;


            $scope.search = function(search_field){
                searchHttpServices.defaultRequest(search_field).then(function(response){
                    var pageInfo = response.data.pageInfo;
                    $scope.nextPage = response.data.nextPageToken
                    $scope.totalPages = Math.ceil(pageInfo.totalResults/10);
                    $scope.currentPage = 1;
                    $scope.searchResults = applicationModel.searchResultModel(response.data.items);

                    sessionStorage.setItem('listaVideos', JSON.stringify($scope.searchResults));
                    sessionStorage.setItem('paginaAtual', $scope.currentPage);
                    sessionStorage.setItem('totalPaginas', Math.ceil(pageInfo.totalResults/10));
                    sessionStorage.setItem('termoPesquisa', search_field);
                });
            }

            $scope.getPage = function(pageToken, pageControl){
                searchHttpServices.pageRequest($scope.search_field, pageToken).then(function(response){
                    $scope.nextPage = response.data.nextPageToken;
                    $scope.prevPage = response.data.prevPageToken;
                    $scope.searchResults = applicationModel.searchResultModel(response.data.items);
                    pageControl ? $scope.currentPage = parseInt($scope.currentPage) + 1 : $scope.currentPage = $scope.currentPage - 1;

                    sessionStorage.setItem('listaVideos', JSON.stringify($scope.searchResults));
                    sessionStorage.setItem('paginaAtual', $scope.currentPage);
                });
            }

            $scope.videoDetails = function(videoId){
                sessionStorage.setItem('videoId', videoId);
                $location.path('/details');

            }

        }]);
})();