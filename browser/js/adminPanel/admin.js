app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/adminPanel/templates/admin.html',
        controller: 'AdminCtrl'
    });

    $stateProvider.state('admin.topics', {
        url: '/topics',
        templateUrl: 'js/adminPanel/templates/topics.html',
        controller: function($scope, topics, TopicFactory){

           $scope.topics= topics;

           $scope.update= TopicFactory.updateTopic;

           $scope.delete= function(id){
            TopicFactory.deleteTopic(id)
            .then( (topics) => {
                $scope.topics= topics;
            })
           }

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

          $scope.types= ['article', 'video', 'book', 'tutorial', 'other']

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