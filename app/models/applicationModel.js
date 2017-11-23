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