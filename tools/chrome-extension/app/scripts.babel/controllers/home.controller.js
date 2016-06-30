app.controller('HomeCtrl', function($scope, topics, MainFactory, AuthService) {

  $scope.user = null;
  $scope.topics = topics;

  $scope.submitResource = function(topicName) {
    return MainFactory.getCurrentSite()
    .then( function (siteDetails) {
      var resourceDetails = {
        url: siteDetails.url,
        name: siteDetails.title,
        topicName: topicName
      }
      return MainFactory.submitResource(resourceDetails);
    });
  }

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
