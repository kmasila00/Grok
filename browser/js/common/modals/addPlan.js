app.controller('AddPlanModalCtrl', function ($scope, $uibModalInstance, options, PlanFactory, topics) {
  if(topics) $scope.topics = topics; // used for My Learning Plans => addTopic

  if(options.topicName) {
    $scope.formTitle = 'Add new plan for ' + options.topicName;
    var topicId = options.topicId;
  } else {
    $scope.formTitle = 'Add new plan';
  }

  if(options.topicName) {
    $scope.defaultName = 'My ' + options.topicName + ' learning plan';
    $scope.defaultDescription = 'I am learning ' + options.topicName + '.';
  } else {
    $scope.defaultName = '';
    $scope.defaultDescription = '';
  }

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
