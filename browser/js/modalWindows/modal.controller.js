app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, FlagFactory) {


  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.delete= function(flagId){
    console.log(flagId);
    FlagFactory.deleteTopicFlag(flagId)
    .then(function(){
      console.log("Something");
    });
  };





});

