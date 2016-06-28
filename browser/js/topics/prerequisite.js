app.controller('PrereqModalCtrl', function ($scope, $uibModalInstance, topicId, topics, TopicFactory) {

  $scope.topics = topics;

  $scope.addPrereq = function(prereq) {
    return TopicFactory.addPrerequisite(topicId, prereq)
    .then(function(res) {
      var prereqId = res.data[0][0].prerequisiteId;
      // returns to TopicCtrl with "fake" object representing the prerequisite object
      $uibModalInstance.close({ prerequisiteId: prereqId, title: prereq });
    });
  }

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
