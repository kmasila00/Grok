app.controller('ResourceCtrl', function($scope, topics, MainFactory, $state, flash) {

  $scope.topics = topics;

  $scope.submitResource = function(topicName) {
    return MainFactory.getCurrentSite()
    .then( function (siteDetails) {
      var resourceDetails = {
        url: siteDetails.url,
        name: siteDetails.title,
        topicName: topicName
      }
      return MainFactory.submitResource(resourceDetails)
      .then( function() {
        flash.setMessage('Resource submitted!  Grok thanks you.')
        $state.go('home');
      })
    });
  }

});
