app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/adminPanel/templates/admin.html',
        controller: 'AdminCtrl'
    });

    $stateProvider.state('admin.topics', {
        url: '/topics',
        templateUrl: 'js/adminPanel/templates/topics.html',
        controller: function($scope, topics, TopicFactory,FlagFactory, $uibModal){

           $scope.topics= topics;

           $scope.update= TopicFactory.updateTopic;


           $scope.delete= function(id){
            TopicFactory.deleteTopic(id)
            .then( (topics) => {
                $scope.topics= topics;
            })
           }

            $scope.openFlags = function (topicId) {

              FlagFactory.fetchTopicFlags(topicId)
              .then(topicFlags => $scope.flags= topicFlags);

               var modalInstance = $uibModal.open({
                 animation: $scope.animationsEnabled,
                 scope: $scope,
                 templateUrl: './js/common/modals/views/topicFlagModal.html',
                 controller: 'ModalInstanceCtrl'
               });
             };

        },
        resolve: {
          topics: function(TopicFactory) {
            return TopicFactory.fetchAll();
          }
        }
    });

    $stateProvider.state('admin.resources', {
        url: '/resources',
        templateUrl: 'js/adminPanel/templates/resources.html',
        controller: function($scope, resources, ResourceFactory, FlagFactory, $uibModal){

          $scope.resources= resources;

          $scope.update= ResourceFactory.updateResource;

          $scope.types= ['article', 'video', 'book', 'documentation', 'tutorial', 'other'];

          $scope.flagType= 'resource';

          $scope.delete= function(id){
            ResourceFactory.deleteResource(id)
            .then(resources => $scope.resources= resources)
          }

          $scope.openFlags = function (resourceId) {

            FlagFactory.fetchResourceFlags(resourceId)
            .then(resourceFlags => $scope.flags= resourceFlags);

             var modalInstance = $uibModal.open({
               animation: $scope.animationsEnabled,
               scope: $scope,
               templateUrl: './js/common/modals/views/topicFlagModal.html',
               controller: 'ModalInstanceCtrl'
             });

           };

        },
        resolve: {
          resources: function(ResourceFactory){
            return ResourceFactory.fetchAll();
          }
        }

    });

});


app.controller('AdminCtrl', function ($scope) {

});
