app.controller('HomeCtrl', function($scope, topics, MainFactory, AuthService) {

  $scope.user = null;
  $scope.topics = topics;

  $scope.isLoggedIn = function () {
    return AuthService.isAuthenticated();
  };

  var setUser = function () {
    AuthService.getLoggedInUser().then(function (user) {
      $scope.user = user;
    });
  };

  setUser();


});
