app.controller('AddPlanModalCtrl', function ($scope, $uibModalInstance, options, PlanFactory, topics) {
  if(topics) $scope.topics = topics; // used for My Learning Plans => addTopic

  if(options.topicName) {
    $scope.formTitle = 'Add new plan for ' + options.topicName;
    var topicId = options.topicId;
  } else {
    $scope.formTitle = 'Add new plan';
  }

  $scope.defaultName = 'My ' + options.topicName + ' Plan';

  $scope.addPlan = function(plan) {
    if(!plan.topicId) 
      plan.topicId = options.topicId;

    return PlanFactory.addNewPlan(plan.name, plan.description, plan.topicId)
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
