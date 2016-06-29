// State & Controller for specific topics

app.config(function ($stateProvider) {

    $stateProvider.state('topic', {
        url: '/topic/:topicId',
        templateUrl: 'js/topics/topic.html',
        controller: 'TopicCtrl',
        resolve: {
          topic: function(TopicFactory, $stateParams) {
            return TopicFactory.fetchById($stateParams.topicId);
          },
          currentUser: function(AuthService) {
            return AuthService.getLoggedInUser();
          }
        }
    });

});


app.controller('TopicCtrl', function ($scope, TopicFactory, topic, VoteFactory, AuthService, $uibModal, $log, $rootScope, PlanFactory, $q, currentUser) {

  //need it for adding plan in topics.js
  $rootScope.topicId = topic.id;
  $scope.user = currentUser;

  //fetch all plans for the Topic
  PlanFactory.fetchPlansByTopic(topic.id)
  .then(function(plansForTopic){
    $scope.topicPlans = plansForTopic;

    //attach the resources for each plan on the plan object
    $scope.topicPlans.forEach(function(elem){
      PlanFactory.fetchResourcesByPlan(elem.id)
      .then(function(res){
        elem.resourcesArr = res;
      })
    });

  });

  //fetch all plans for the USER
  PlanFactory.fetchPlansByUser($scope.user.id)
  .then(function(plansForUser){
    $scope.userPlans = plansForUser;

    //attach the resources for each plan on the plan object
    $scope.userPlans.forEach(function(elem){
      PlanFactory.fetchResourcesByPlan(elem.id)
      .then(function(res){
        elem.resourcesArr = res;
      })
    });

  });

  $scope.copyPlan = function(planId){
    $scope.selectedPlan.resourcesArr = [];
    PlanFactory.fetchResourcesByPlan(planId)
    .then(function(newResources){
      $scope.selectedPlan.resourcesArr = newResources;
    })
  }

  $scope.moveUp = function(resourceId){
    var plan = $scope.selectedPlan;
    var rArr = plan.resourcesArr;

    for(var i = 1; i < rArr.length; i++){
        
          if(rArr[i].id === resourceId){
            var temp = rArr[i];
            rArr[i] = rArr[i-1];
            rArr[i-1] = temp;
          }

    }
  }

  $scope.moveDown = function(resourceId){
    var plan = $scope.selectedPlan;
    var rArr = plan.resourcesArr;

    for(var i = 0; i < rArr.length; i++){
        
          if(rArr[i].id === resourceId){
            var temp = rArr[i];
            rArr[i] = rArr[i+1];
            rArr[i+1] = temp;
          }

    }
  }

  $scope.topic = topic;
  $scope.resources = $scope.topic.resources;

  //adds resource to a specific plan
  $scope.addToPlan = function(resourceId){
    PlanFactory.addResourceToPlan($scope.selectedPlan.id, resourceId)
    .then();
  }

  $scope.removeFromPlan = function(planId, resourceId){
    PlanFactory.removeResourceFromPlan(planId, resourceId)
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

  // Suggest related topics (i.e., prerequisites or subsequent topics)
  $scope.suggestRelatedTopic = function( options ) {
    if(options.suggestionType === 'prereq') {
      options.formTitle = "Add a prerequisite to " + $scope.topic.title;
    } else if(options.suggestionType === 'subseq') {
      options.formTitle = "Suggest a next topic for " + $scope.topic.title;
    }
    var suggestTopicModal = $uibModal.open({
      animation: true, // ??
      templateUrl: 'js/topics/suggestTopic.html',
      controller: 'SuggestTopicModalCtrl',
      size: 'sm',
      resolve: {
        options: options,
        topics: TopicFactory.fetchAll()
      }
    });

    suggestTopicModal.result
    .then(function (results) {
      var type = results[0],
          suggestedTopic = results[1];
      // update DOM
      if(type === 'prereq') {
        $scope.topic.prereqTopics.push( suggestedTopic );
      } else if(type === 'subseq'){
        $scope.topic.subseqTopics.push( suggestedTopic );
      }
    });
  }


  // Voting
  // # votes in nested object
  // key = type of vote (resource, relationship)
  // value = ...
  //      key = type id / value = # total votes
  $scope.numVotes = {};

  // get current user ID - used to determine whether a user has voted
  var userId;
  AuthService.getLoggedInUser()
  .then( function(user) {
    if(user) userId = user.id;
  });

  // Voting
  // Get existing votes
  $q.all([
    VoteFactory.fetchResourceVotes(
      topic.resources.map( function(resource) {
        return resource.id;
    })),
    VoteFactory.fetchPrereqVotes(topic.id),
    VoteFactory.fetchSubseqVotes(topic.id)
  ])
  .then( function(votes) {
    var resourceVotes = votes[0],
        prereqVotes = votes[1],
        subseqVotes = votes[2];
    resourceVotes.forEach( function(vote) {
      if(vote.userId === userId) toggleVoteButton('resource', vote.resourceId);
      incrementVoteCount('resource', vote.resourceId, 1);
    });
    prereqVotes.forEach( function(vote) {
      if(vote.userId === userId) toggleVoteButton('prereq', vote.prerequisiteId);
      incrementVoteCount('prereq', vote.prerequisiteId, 1);
    });
    subseqVotes.forEach( function(vote) {
      // console.log(vote)
      if(vote.userId === userId) toggleVoteButton('subseq', vote.topicId);
      incrementVoteCount('subseq', vote.topicId, 1);
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
