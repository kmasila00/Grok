app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, FlagFactory) {

  FlagFactory.fetchTopicFlags(1)
  .then(topicFlags => $scope.flags= topicFlags)

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };





});

