app.config(function ($stateProvider) {

    $stateProvider.state('topic', {
        url: '/topic',
        templateUrl: 'js/topic/topic.html',
        controller: 'TopicCtrl',
    });

});

app.controller('TopicCtrl', function ($scope, TopicFactory) {



});
