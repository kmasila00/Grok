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

app.controller('TopicCtrl', function ($scope, TopicFactory, topic, VoteFactory, AuthService, $uibModal, $log, $q) {

  $scope.topic = topic;
  $scope.resources = $scope.topic.resources;

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

  // Prerequisites
  $scope.addPrerequisite = function( topicId ) {
    var addPrereqModal = $uibModal.open({
      animation: true, // ??
      templateUrl: 'js/topics/addPrerequisite.html',
      controller: 'PrereqModalCtrl',
      size: 'sm',
      resolve: {
        topicId: topicId,
        topics: TopicFactory.fetchAll()
      }
    });

    addPrereqModal.result
    .then(function (newPrereq) {
      // update DOM
      $scope.topic.prereqTopics.push( newPrereq );
    });
  }


  // Voting
  // # votes in nested object
  // key = type of vote (resource, relationship)
  // value = ...
  //      key = type id / value = # total votes
  $scope.numVotes = {};

  // Voting
  // Get existing votes
  $q.all([
    VoteFactory.fetchResourceVotes(
      topic.resources.map( function(resource) {
        return resource.id;
    })),
    VoteFactory.fetchRelationshipVotes(topic.id)
  ])
  .then( function(votes) {
    var resourceVotes = votes[0],
        relationshipVotes = votes[1];
    resourceVotes.forEach( function(vote) {
      toggleVoteButton('resource', vote.resourceId);
      incrementVoteCount('resource', vote.resourceId, 1);
    });
    relationshipVotes.forEach( function(vote) {
      toggleVoteButton('relationship', vote.prerequisiteId);
      incrementVoteCount('relationship', vote.prerequisiteId, 1);
    });
  })

  $scope.upvote = function(type, id) {
    if(AuthService.isAuthenticated()) {
      VoteFactory.addVote(type, id, topic.id)
      .then( function(success) {
        if(success) {
          toggleVoteButton(type, id);
          incrementVoteCount(type, id, 1);
        }
      })
    }
  }

  $scope.devote = function(type, id) {
    if(AuthService.isAuthenticated()) {
      VoteFactory.removeVote(type, id, topic.id)
      .then( function(success) {
        if(success) {
          toggleVoteButton(type, id);
          incrementVoteCount(type, id, -1);
        }
      })
    }
  }


  // show or hide vote/voted button
  // -- type = string denoting type of vote (i.e., 'resource', 'relationship')
  function toggleVoteButton(type, id) {
    $('#btn-' + type + '-upvote-' + id).toggleClass('hidden');
    $('#btn-' + type + '-voted-' + id).toggleClass('hidden');
  }

  // add vote to the DOM
  // -- type = string denoting type of vote (i.e., 'resource', 'relationship')
  function incrementVoteCount(type, id, amount) {
    amount = amount || 1; // add by default
    if(!$scope.numVotes[type]) $scope.numVotes[type] = {};
    var voteCounter = $scope.numVotes[type];
    if(!voteCounter[id]) voteCounter[id] = amount;
    else voteCounter[id] += amount;
  }

});
