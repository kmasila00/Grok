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

app.controller('TopicCtrl', function ($scope, TopicFactory, topic, VoteFactory, AuthService, $uibModal, $log, $rootScope, PlanFactory) {

  //need it for adding plan in topics.js
  $rootScope.topicId = topic.id;

  //fetch all plans for the topic
  PlanFactory.fetchPlansByTopic(topic.id)
  .then(function(plansForTopic){
    $scope.plans = plansForTopic;
    
    //attach the resources for each plan on the plan object
    $scope.plans.forEach(function(elem){
      PlanFactory.fetchResourcesByPlan(elem.id)
      .then(function(res){
        elem.resourcesArr = res;
      })
    });

  });

  $scope.topic = topic;
  $scope.resources = $scope.topic.resources;

  //adds resource to a specific plan
  $scope.addToPlan = function(resourceId){
    console.log(resourceId);
    PlanFactory.addResourceToPlan($scope.selectedPlan.id, resourceId)
    .then();
  }

  $scope.isLoggedIn = AuthService.isAuthenticated();
  $scope.showPlans = false;
  $scope.showResources = true;

  $scope.toggleShowPlans = function() {
    $scope.showPlans = !$scope.showPlans;
  }

  $scope.toggleShowResources = function() {
    $scope.showResources = !$scope.showResources;
  }

  // Tags
  $scope.tagDisplay = {};

  // -- get all unique tags, display all by default
  $scope.topic.resources.forEach( function(resource) {
    resource.display = true; // initially show all tags on the DOM
    resource.tags.forEach( function(tag) {
      if(!$scope.tagDisplay[tag.name]) $scope.tagDisplay[tag.name] = true;
    });
  });

  $scope.showAllTags = function() {
    for(var tagName in $scope.tagDisplay) $scope.tagDisplay[tagName] = true;
    $('.btn-tag-filter').addClass('active');
    refilterTags();
  }

  $scope.toggleTagFilter = function(tagName, $event) {
    $($event.currentTarget).toggleClass('active');
    $scope.tagDisplay[tagName] = !$scope.tagDisplay[tagName];
    refilterTags();
  }

  function refilterTags() {
    $scope.topic.resources.forEach( function(resource) {
      resource.display = true;
      resource.tags.forEach( function(tag) {
        if(!$scope.tagDisplay[tag.name]) resource.display = false;
      });
    });
  }

  // -- add a tag to a resource
  $scope.addTag = function(resourceId) {
    var addTagModal = $uibModal.open({
      animation: true, // ??
      templateUrl: 'js/topics/addTag.html',
      controller: 'TagModalCtrl',
      size: 'sm',
      resolve: {
        resourceId: resourceId
      }
    });

    addTagModal.result
    .then(function (newTag) {
      // update DOM
      $scope.topic.resources.forEach( function(resource) {
        if(resource.id === resourceId) {
          resource.tags.push({name: newTag});
        }
      });
      if(!$scope.tagDisplay[newTag]) $scope.tagDisplay[newTag] = true;
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
