app.controller('TopicCtrl', function ($scope, $rootScope, $uibModal, $log, TopicFactory, topic, plans, votes) {
  $scope.topic = topic;
  $scope.topic.plans = plans;
  $scope.topic.votes = votes;

  // get current user ID - used to determine whether a user has voted
  var userId = $rootScope.user.id;
  // isLoggedIn = true is user is logged in; i.e., there is a user on the $rootScope
  $scope.isLoggedIn = userId >= 0;

  // Suggest related topics (i.e., prerequisites or subsequent topics)
  $scope.suggestRelatedTopic = function( options ) {
    if(options.suggestionType === 'prereq') {
      options.formTitle = "Add a prerequisite to " + $scope.topic.title;
    } else if(options.suggestionType === 'subseq') {
      options.formTitle = "Suggest a next topic for " + $scope.topic.title;
    }
    var suggestTopicModal = $uibModal.open({
      animation: true,
      templateUrl: 'js/common/modals/views/suggestTopic.html',
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

  // FLAGGING
  $scope.flagTopic = function(id) {
    $uibModal.open({
      animation: true,
      templateUrl: './js/common/modals/views/addFlagModal.html',
      controller: 'AddFlagModalInstanceCtrl',
      resolve: {
        options: { type: 'topic', id: id }
      }
    });
  }

  // ADD NEW RESOURCE
  $scope.addNewResource = function() {
    var addResourceModal = $uibModal.open({
      animation: true,
      templateUrl: './js/common/modals/views/addResource.html',
      controller: 'AddResourceModalCtrl',
      resolve: {
        options: { topicId: $scope.topic.id, topicName: $scope.topic.title }
      }
    });
    addResourceModal.result
    .then(function (newResource) {
      $scope.topic.resources.push(newResource);
    });
  }

  // ADD NEW PLAN
  $scope.addNewPlan = function() {
    var addPlanModal = $uibModal.open({
      animation: true,
      templateUrl: './js/common/modals/views/addPlan.html',
      controller: 'AddPlanModalCtrl',
      resolve: {
        options: { topicId: $scope.topic.id, topicName: $scope.topic.title }
      }
    });
    addPlanModal.result
    .then(function (newPlan) {
      $scope.topic.plans.push(newPlan);
    });
  }

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
