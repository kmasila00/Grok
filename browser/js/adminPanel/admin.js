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
                 templateUrl: './js/modalWindows/topicFlagModal.html',
                 controller: 'ModalInstanceCtrl'
               });

               // modalInstance.result.then(function (selectedItem) {
               //   $scope.selected = selectedItem;
               // });
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
        controller: function($scope, resources, ResourceFactory){

          $scope.resources= resources;

          $scope.update= ResourceFactory.updateResource;

          $scope.types= ['article', 'video', 'book', 'documentation', 'tutorial', 'other'];

          $scope.delete= function(id){
            ResourceFactory.deleteResource(id)
            .then(resources => $scope.resources= resources)
          }

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