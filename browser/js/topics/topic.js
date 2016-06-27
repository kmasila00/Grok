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

app.controller('TopicCtrl', function ($scope, TopicFactory, topic, VoteFactory, AuthService, $uibModal, $log) {

  $scope.topic = topic;

  $scope.showPlans = false;
  $scope.showResources = true;

  $scope.toggleShowPlans = function() {
    $scope.showPlans = !$scope.showPlans;
  }

  $scope.toggleShowResources = function() {
    $scope.showResources = !$scope.showResources;
  }

  $scope.addTag = function(resourceId) {
    console.log($('#btn-add-tag-' + resourceId))
    var modalInstance = $uibModal.open({
      animation: true, // ??
      templateUrl: 'js/topics/addTag.html',
      controller: 'TagModalCtrl',
      size: 'sm',
      resolve: {
        resourceId: resourceId
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

  }

  // Voting
  // # votes for each resource; key = resourceId / value = # total votes
  $scope.numVotes = {};

  // Get existing votes
  VoteFactory.fetchResourceVotes(
    topic.resources.map( function(resource) {
      return resource.id;
    })
  )
  .then( function(votes) {
    votes.forEach( function(vote) {
      toggleVoteButton(vote.resourceId);
      incrementVoteCount(vote.resourceId, 1);
    });
  })

  $scope.upvoteResource = function(resourceId) {
    if(AuthService.isAuthenticated()) {
      VoteFactory.addResourceVote(resourceId)
      .then( function(success) {
        if(success) {
          toggleVoteButton(resourceId);
          incrementVoteCount(resourceId, 1);
        }
      })
    }
  }

  $scope.devoteResource = function(resourceId) {
    if(AuthService.isAuthenticated()) {
      VoteFactory.rmResourceVote(resourceId)
      .then( function(success) {
        if(success) {
          toggleVoteButton(resourceId);
          incrementVoteCount(resourceId, -1);
        }
      })
    }
  }

  function toggleVoteButton(resourceId) {
    $('#btn-upvote-' + resourceId).toggleClass('hidden');
    $('#btn-voted-' + resourceId).toggleClass('hidden');
  }

  function incrementVoteCount(resourceId, amount) {
    amount = amount || 1; // add by default
    if(!$scope.numVotes[resourceId]) $scope.numVotes[resourceId] = amount;
    else $scope.numVotes[resourceId] += amount;
  }

});
