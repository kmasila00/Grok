app.controller('PrereqModalCtrl', function ($scope, $uibModalInstance, topicId, topics, TopicFactory) {

  $scope.topics = topics;
  console.log($scope.topics);

  $scope.addPrereq = function(prereq) {
    $uibModalInstance.close(prereq);
    return TopicFactory.addPrerequisite(topicId, prereq);
  }

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
