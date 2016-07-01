//***********************Controller for flag modals!!!***************//
app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, FlagFactory) {

  $scope.heading= $scope.flagType ? 'Resource Flags' : 'Topic Flags';

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.delete= function(flag){
    var deleteFlag= $scope.flagType ? FlagFactory.deleteResourceFlag : FlagFactory.deleteTopicFlag;
    var modelId= $scope.flagType ? 'resourceId' : 'topicId';
    deleteFlag(flag.id, flag[modelId])
    .then(function(flags){
      $scope.flags= flags;
    });
  };

});


//*******************Controller for topic/resource/plan**************//
app.controller('ModalInstanceFormCtrl', function ($scope, $rootScope, $uibModalInstance, modalName, ResourceFactory, TopicFactory, PlanFactory) {

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
          })
          $uibModalInstance.dismiss();
        } else if ($scope.name === 'Resource'){
          //this is supposed to check to make sure url field and type is not empty
          //have to edit to make sure all fields are required and get rid of description
          if($scope.form.formUrl.$dirty){
            ResourceFactory.addNewResource($scope.TRPname, $scope.resourceUrl, $scope.resourceType, $rootScope.topicId)
            .then(function(resource){
            })
            $uibModalInstance.dismiss();
          } else {
            $scope.showError = true;
          }
        } else {
          //uses the rootscope from topic.js to create a plan that has the topic id
          PlanFactory.addNewPlan($scope.TRPname, $scope.TRPdesc, $rootScope.topicId)
          .then(function(newPlan){
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


//****************ADD FLAG MODAL******************//

app.controller('AddFlagModalInstanceCtrl', function($scope, $rootScope, $window, resourceId, $uibModalInstance, FlagFactory){
  $scope.reasons= ['Rude or Abusive', 'Spam', 'Duplicate'];

  if(resourceId){
    $scope.reasons.push('Off-Topic');
    $scope.addFlag= "addResourceFlag";
    $scope.id= resourceId;
    $scope.heading= 'Resource';
  }
  else{
    $scope.addFlag= "addTopicFlag";
    $scope.id= $rootScope.topicId;
    $scope.heading= 'Topic';
  }

  $scope.flagIt= function(flag){

    FlagFactory[$scope.addFlag]($scope.id, flag)
    .then(function(res){
      if(res[0]=== "Y") $window.alert(res);
      $uibModalInstance.close();
    })
  }


  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
//**********************************************//



app.controller('ModalFormCtrl', function ($scope, $uibModal, $log, $rootScope) {

  $scope.animationsEnabled = true;

  $scope.open = function (name, size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './js/modalWindows/addTPRModal.html',
      controller: 'ModalInstanceFormCtrl',
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


//*************************************************//
app.controller('ModalPlanCtrl', function ($scope, $uibModal, $log, $rootScope) {

  $scope.animationsEnabled = true;

  $scope.open = function (name, size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: './js/modalWindows/addPlanModal.html',
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
