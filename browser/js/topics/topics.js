// State & Controller for all topics

app.config(function ($stateProvider) {

    $stateProvider.state('topics', {
        url: '/topics',
        templateUrl: 'js/topics/topics.html',
        controller: 'TopicsCtrl',
        resolve: {
          topics: function(TopicFactory) {
            return TopicFactory.fetchAll();
          }
        }
    });

});

app.controller('TopicsCtrl', function ($scope, TopicFactory, topics) {

  $scope.topics = topics;

});

//MODAL FORMS!!!!

app.controller('ModalCtrl', function ($scope, $uibModal, $log, $rootScope) {

  $scope.animationsEnabled = true;

  $scope.open = function (name, size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, modalName, ResourceFactory, TopicFactory, PlanFactory) {

  $scope.name = modalName;
  $scope.showit = false;

  if($scope.name === 'Resource')
    $scope.showit = true;

  $scope.add = function(){
    //checks to see if form is not empty
    if($scope.form.formTitle.$dirty && $scope.form.formDesc.$dirty){
        //checks to see what we are creating
        if($scope.name === 'Topic'){
          TopicFactory.addNewTopic($scope.TRPname, $scope.TRPdesc)
          .then(function(newTopic){
            alert('You Created the Topic!');
          })
          $uibModalInstance.dismiss();
        } else if ($scope.name === 'Resource'){
          //this is supposed to check to make sure url field and type is not empty
          //have to edit to make sure all fields are required and get rid of description
          if($scope.form.formUrl.$dirty){
            ResourceFactory.addNewResource($scope.TRPname, $scope.resourceUrl, $scope.resourceType)
            .then(function(resource){
              alert('Resource has been added!');
            })
            $uibModalInstance.dismiss();
          } else {
            $scope.showError = true;
          }
        } else {
          PlanFactory.addNewPlan($scope.TRPname, $scope.TRPdesc)
          .then(function(newPlan){
            alert('You Created A New Plan');
          })
          $uibModalInstance.dismiss();
        }
    } else {
      $scope.showError = true;
    }
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
