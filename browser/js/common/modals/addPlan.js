app.controller('AddPlanModalCtrl', function ($scope, $uibModalInstance, options, PlanFactory) {
  $scope.formTitle = 'Add new plan for ' + options.topicName;
  var topicId = options.topicId;

  $scope.addPlan = function(plan) {
    return PlanFactory.addNewPlan(plan.name, plan.description, topicId)
    .then(function(newPlan) {
      $uibModalInstance.close(newPlan);
    });
  };

  $scope.submit = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
