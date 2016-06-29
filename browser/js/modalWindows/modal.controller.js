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

