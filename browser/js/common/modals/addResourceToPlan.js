app.controller('AddResourceToPlanModalCtrl', function ($scope, $uibModalInstance, plans, resource, options, ResourceFactory, PlanFactory) {
  $scope.formTitle = 'Add \'' + resource.name + '\' to my learning plan';
  $scope.plans = plans;
  $scope.resource = resource;
  var topicId = options.topicId;


  $scope.addResourceToPlan = function(plan) {
    return PlanFactory.addResourceToPlan(plan.id, $scope.resource.id)
    .then(function(newResource) {
      $uibModalInstance.close(newResource);
    });
  };

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
