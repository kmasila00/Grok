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


app.controller('TopicCtrl', function ($scope, TopicFactory, topic, VoteFactory, AuthService, $uibModal, $log, $rootScope, PlanFactory, $q) {

  $scope.topic = topic;

  //need it for adding plan
  $rootScope.topicId = topic.id;

  // get current user ID - used to determine whether a user has voted
  var userId = $rootScope.user.id;

  //fetch all plans for the Topic
  PlanFactory.fetchPlansByTopic(topic.id)
  .then(function(plansForTopic){
    $scope.topicPlans = plansForTopic;
  });


  if(AuthService.isAuthenticated()){

      //fetch all plans for the USER for a TOPIC
      PlanFactory.fetchPlansByUser(userId)
      .then(function(plansForUser){
        $scope.userPlans = [];
        plansForUser.forEach(function(elem){
          if(elem.topicId === topic.id)
            $scope.userPlans.push(elem);
        })
      });

      $scope.copyPlan = function(plan){
        $scope.selectedPlan.resources = plan.resources;
      }

      $scope.moveUp = function(resourceId){
        var plan = $scope.selectedPlan;
        var rArr = plan.resources;

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
        var rArr = plan.resources;

        for(var i = 0; i < rArr.length-1; i++){

              if(rArr[i].id === resourceId){
                var temp = rArr[i];
                rArr[i] = rArr[i+1];
                rArr[i+1] = temp;
                break;
              }

        }
      }
  }


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

  // Suggest related topics (i.e., prerequisites or subsequent topics)
  $scope.suggestRelatedTopic = function( options ) {
    if(options.suggestionType === 'prereq') {
      options.formTitle = "Add a prerequisite to " + $scope.topic.title;
    } else if(options.suggestionType === 'subseq') {
      options.formTitle = "Suggest a next topic for " + $scope.topic.title;
    }
    var suggestTopicModal = $uibModal.open({
      animation: true,
      templateUrl: 'js/common/modals/suggestTopic.html',
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


  // VOTES
  //
  // log of votes by userId, through nested object
  // key = type of vote (resource, prereq, subseq)
  // value = ...
  //      key = type (resource, etc)) / value = ...
  //             key = type Id / value = array of userIds that have voted
  $scope.votes = {};
  VoteFactory.getProcessedVotes($scope.topic)
  .then( function(processedVotes) {
    $scope.votes = processedVotes;
  });


  // DATA SORTING
  // Sort master routing function
  // function sort(type) {
  //   switch(type) {
  //     case 'resources':
  //       $scope.topic.resources = sortData($scope.topic.resources, $scope.numVotes.resource, 'id');
  //       break;
  //     case 'prereq':
  //       $scope.topic.prereqTopics = sortData($scope.topic.prereqTopics, $scope.numVotes.prereq, 'prerequisiteId');
  //       break;
  //     case 'subseq':
  //       $scope.topic.subseqTopics = sortData($scope.topic.subseqTopics, $scope.numVotes.subseq, 'topicId');
  //       break;
  //   }
  // }

  // Sorts voted data arrays - i.e., prerequisites, subsequent topics, and reosurces
  // -- dataArr = $scope data array to be sorted
  // -- votes = $scope.numVotes object value to sort by
  // -- idKey = idKey on dataArr corresponding to the key in votes
  // function sortData (dataArr, votes, idKey) {
  //
  //   if(!votes) return dataArr; // if no votes found, do not sort
  //
  //   function inOrder (index) {
  //     if (index === dataArr.length - 1) return true;
  //     var baseId = dataArr[index][idKey],
  //         nextId = dataArr[index + 1][idKey],
  //         numVotesBase = votes[baseId] || 0,
  //         numVotesNext = votes[nextId] || 0;
  //     return numVotesBase < numVotesNext;
  //   }
  //
  //   function swap (index) {
  //     var oldLeftValue = dataArr[index];
  //     dataArr[index] = dataArr[index + 1];
  //     dataArr[index + 1] = oldLeftValue;
  //   }
  //
  //   var sorted = false;
  //   for (var end = dataArr.length; end > 0 && !sorted; end--) {
  //     sorted = true;
  //     for (var j = 0; j < end; j++) {
  //       if (!inOrder(j)) {
  //         swap(j);
  //         sorted = false;
  //       }
  //     }
  //   }
  //   return dataArr.reverse();
  // }


});
