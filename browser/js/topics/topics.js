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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceFormCtrl', function ($scope, $uibModalInstance, modalName, $rootScope) {

  $scope.name = modalName;

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});