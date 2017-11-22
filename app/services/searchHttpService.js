(function(){
    'use strict';
    angular.module('buscaVideo')
        .factory('searchHttpServices', ['$http', function ($http){

            var KEY = 'AIzaSyAZ7g-fZdfwaVZ7gsm0wjQY7vxcMgK999U';
            var youtubeUrl = 'https://www.googleapis.com/youtube/v3/search';
            var partParams = 'id,snippet';

            var _defaultRequest = function(search_field){
                return $http({
                    method: 'GET',
                    url: youtubeUrl,
                    params:{
                        key: KEY,
                        q: search_field,
                        part: partParams,
                        maxResults: 10
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
                        maxResults: 10
                    }
                })
            }

            return {
                defaultRequest: _defaultRequest,
                pageRequest: _pageRequest
            };

        }]);
}());