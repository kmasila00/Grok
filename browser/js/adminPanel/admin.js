app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/adminPanel/templates/admin.html',
        controller: 'AdminCtrl'
    });

    $stateProvider.state('admin.topics', {
        url: '/topics',
        templateUrl: 'js/adminPanel/templates/topics.html',
        controller: function($scope, TopicFactory){

           TopicFactory.fetchAll()
           .then(topics =>  $scope.topics= topics);

           $scope.update= TopicFactory.updateTopic;

           $scope.delete= function(id){
            TopicFactory.deleteTopic(id)
            .then( (topics) => {
                $scope.topics= topics;
            })

           }
        }
    });
});


app.controller('AdminCtrl', function ($scope) {





}); 