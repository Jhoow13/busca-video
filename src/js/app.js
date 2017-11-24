(function() {
    'use strict';
    angular.module('buscaVideo', ['ngRoute', 'ngSanitize', 'ngMaterial', 'ngMessages']);

})();
(function(){
    'use strict';

    angular.module('buscaVideo').config(['$routeProvider', '$locationProvider',
             function($routeProvider, $locationProvider) {

            $routeProvider
            .when('/', {
                templateUrl: '/src/html/inicial.html',
                controller: 'inicialController'
            })

            .when('/details',{
                templateUrl: '/src/html/details.html',
                controller: 'detailsController'
            })

            .otherwise({redirectTo: '/'});


            $locationProvider.hashPrefix('');

        }]);
})();


(function(){
    'use strict';
    angular.module('buscaVideo')
        .factory('searchHttpServices', ['$http', function ($http){

            var KEY = 'AIzaSyAZ7g-fZdfwaVZ7gsm0wjQY7vxcMgK999U';
            var youtubeUrl = 'https://www.googleapis.com/youtube/v3/search';
            var youtubeVideoUrl = 'https://www.googleapis.com/youtube/v3/videos';
            var partParams = 'id,snippet';
            var partVideoParams = 'snippet,statistics,player';

            var _defaultRequest = function(search_field){
                return $http({
                    method: 'GET',
                    url: youtubeUrl,
                    params:{
                        key: KEY,
                        q: search_field,
                        part: partParams,
                        maxResults: 12,
                        type: 'video'
                    }
                });
            };

            var _pageRequest = function(search_field, pageToken){
                return $http({
                    method: 'GET',
                    url: youtubeUrl,
                    params:{
                        key: KEY,
                        q:search_field,
                        part: partParams,
                        pageToken: pageToken,
                        maxResults: 12
                    }
                })
            }

            var _videoDetailsRequest = function(videoId){
                return $http({
                    method: 'GET',
                    url: youtubeVideoUrl,
                    params:{
                        key: KEY,
                        id: videoId,
                        part: partVideoParams
                    }
                })
            }

            return {
                defaultRequest: _defaultRequest,
                pageRequest: _pageRequest,
                videoDetailsRequest: _videoDetailsRequest
            };

        }]);
}());
(function(){
    'use strict';
    angular.module('buscaVideo')
        .factory('applicationModel', ['$sce',function($sce){

            var _searchResultModel = function(response){
                var model = [];
                response.forEach(function(itemResponse){
                    model.push({
                        id: itemResponse.id.videoId || 'XIMLoLxmTDw',
                        titulo: itemResponse.snippet.title || 'Sem título',
                        descricao: itemResponse.snippet.description || 'Sem descrição',
                        thumbnail: itemResponse.snippet.thumbnails.medium.url || 'https://placeholdit.co//i/320x180',
                    })
                });

                return model;
            }

            var _videoDetailsModel = function(response){
                var model = {};
                response.forEach(function(itemResponse){
                    model.titulo = itemResponse.snippet.title || 'Sem título',
                    model.descricao = itemResponse.snippet.description || 'Sem descrição',
                    model.views = itemResponse.statistics.viewCount || 0,
                    model.embed = $sce.trustAsHtml(itemResponse.player.embedHtml) || '<p>Sem vídeo</p>'
                });

                return model;
            }

            return{
                searchResultModel: _searchResultModel,
                videoDetailsModel: _videoDetailsModel
            }

        }]);
}());
(function(){
    'use strict';

    angular.module('buscaVideo').controller('detailsController',
               ['$scope','$location','applicationModel','searchHttpServices',
        function($scope,$location,applicationModel,searchHttpServices){

            var videoId = sessionStorage.getItem('videoId');

            $scope.back = function(){
                $location.path('/');
            }

            searchHttpServices.videoDetailsRequest(videoId).then(function(response){
                $scope.details = applicationModel.videoDetailsModel(response.data.items);
            });


        }]);
})();
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
                    $scope.totalPages = Math.ceil(pageInfo.totalResults/12);
                    $scope.currentPage = 1;
                    $scope.searchResults = applicationModel.searchResultModel(response.data.items);

                    sessionStorage.setItem('listaVideos', JSON.stringify($scope.searchResults));
                    sessionStorage.setItem('paginaAtual', $scope.currentPage);
                    sessionStorage.setItem('totalPaginas', Math.ceil(pageInfo.totalResults/10));
                    sessionStorage.setItem('termoPesquisa', search_field);
                    $scope.search_submit = true;
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

            $scope.clear = function(){
                sessionStorage.clear();
                $scope.searchResults = [];
                $scope.currentPage = 0;
                $scope.totalPages = 0;
                $scope.search_submit = false;
            }

        }]);
})();