// Build, display modal form; handle output
app.controller('ModalPlanCtrl', function ($scope, $uibModal, $log) {

  $scope.animationsEnabled = true;

  $scope.open = function (name, size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './js/common/modals/views/addPlanModal.html',
      controller: 'ModalInstancePlanCtrl',
      size: size,
      resolve: {
          modalName: function(){
            return name;
          }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});


// Modal controller
app.controller('ModalInstancePlanCtrl', function ($scope, $rootScope, $uibModalInstance, modalName, ResourceFactory, TopicFactory, PlanFactory) {

  $scope.name = modalName;
  $scope.showit = false;

  //fetch all plans for the USER for a TOPIC
  PlanFactory.fetchPlansByUser(userId)
  .then(function(plansForUser){
    $scope.userPlans = [];
    plansForUser.forEach(function(elem){
      if(elem.topicId === topic.id)
        $scope.userPlans.push(elem);
    })
  });

  //adds resource to a specific plan
  $scope.addToPlan = function(resourceId){
    PlanFactory.addResourceToPlan($scope.selectedPlan.id, resourceId)
    .then();
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
