app.controller('AddTopicModalCtrl', function ($scope, $uibModalInstance, TopicFactory) {
  $scope.formTitle = 'Add new topic';

  $scope.addTopic = function(topic) {
    console.log(topic)
    return TopicFactory.addNewTopic(topic.name, topic.description)
    .then(function(newTopic) {
      console.log(newTopic)
      $uibModalInstance.close(newTopic);
    });
  };

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
