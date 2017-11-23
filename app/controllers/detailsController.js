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