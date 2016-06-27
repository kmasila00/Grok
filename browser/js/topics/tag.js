app.controller('TagModalCtrl', function ($scope, $uibModalInstance, resourceId, ResourceFactory) {

  $scope.addTag = function(tag) {
    $uibModalInstance.close($scope.selected.item);
    return ResourceFactory.addTag(resourceId, tag);
  }

  $scope.submit = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
