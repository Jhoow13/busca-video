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