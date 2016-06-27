// State & Controller for specific topics

app.config(function ($stateProvider) {

    $stateProvider.state('topic', {
        url: '/topic/:topicId',
        templateUrl: 'js/topics/topic.html',
        controller: 'TopicCtrl',
        resolve: {
          topic: function(TopicFactory, $stateParams) {
            return TopicFactory.fetchById($stateParams.topicId);
          }
        }
    });

});

app.controller('TopicCtrl', function ($scope, TopicFactory, topic, VoteFactory) {

  $scope.topic = topic;

  $scope.showPlans = false;
  $scope.showResources = true;

  $scope.toggleShowPlans = function() {
    $scope.showPlans = !$scope.showPlans;
  }

  $scope.toggleShowResources = function() {
    $scope.showResources = !$scope.showResources;
  }

  $scope.upvoteResource = function(resourceId) {
    VoteFactory.addResourceVote(resourceId)
    .then( function(success) {
      if(success) toggleVoteButton(resourceId);
    })
  }

  $scope.devoteResource = function(resourceId) {
    VoteFactory.rmResourceVote(resourceId)
    .then( function(success) {
      if(success) toggleVoteButton(resourceId);
    })
  }

  function toggleVoteButton(resourceId) {
    $('#btn-upvote-' + resourceId).toggleClass('hidden');
    $('#btn-voted-' + resourceId).toggleClass('hidden');
  }

});
