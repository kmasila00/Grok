app.controller('SuggestTopicModalCtrl', function ($scope, $uibModalInstance, options, topics, TopicFactory) {

  $scope.topics = topics;
  $scope.suggestionType = options.suggestionType;
  var topicId = options.topicId;

  // type = type of topic relationship (prereq or subseq)
  $scope.suggestTopic = function(type, newTopicName) {
    return TopicFactory.suggestTopic(type, topicId, newTopicName)
    .then(function(res) {
      // returns to TopicCtrl with "fake" object representing the suggested topic object
      var returnObj = { title: newTopicName };
      console.log(res.data[0][0]);
      if(type === 'prereq') {
        returnObj.prerequisiteId = res.data[0][0].prerequisiteId;
      } else if (type === 'subseq') {
        returnObj.subsequentId = res.data[0][0].topicId;
      }
      console.log(returnObj)
      $uibModalInstance.close([type, returnObj]);
    });
  }

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
