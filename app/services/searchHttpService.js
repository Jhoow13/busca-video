(function(){
    'use strict';
    angular.module('buscaVideo')
        .factory('searchHttpServices', ['$http', function ($http){

            var KEY = 'AIzaSyAZ7g-fZdfwaVZ7gsm0wjQY7vxcMgK999U';
            var youtubeUrl = 'https://www.googleapis.com/youtube/v3/search';

            var _defaultRequest = function(search_field){
                return $http({
                    method: 'GET',
                    url: youtubeUrl,
                    params:{
                        key: KEY,
                        q: search_field,
                        part: 'id,snippet'
                    }
                });
            };

            return {
                defaultRequest: _defaultRequest
            };

        }]);
}());