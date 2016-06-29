app.controller('TagModalCtrl', function ($scope, $uibModalInstance, resourceId, ResourceFactory) {

  $scope.addTag = function(tag) {
    $uibModalInstance.close(tag);
    return ResourceFactory.addTag(resourceId, tag);
  }

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
