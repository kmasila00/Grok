app.controller('MainController', function($scope, topics, MainFactory) {

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

});
