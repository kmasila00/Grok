app.controller('ResourceCtrl', function($scope, topics, MainFactory, $state, flash) {

  $scope.topics = topics;

  $scope.submitResource = function(resource) {
    var topicName;
    if(resource.topic && resource.topic.title) topicName = resource.topic.title;
    else topicName = resource.topic; // if the topic doesn't already exist

    return MainFactory.getCurrentSite()
    .then( function (siteDetails) {
      var newResourceDetails = {
        url: siteDetails.url,
        name: siteDetails.title,
        topicName: topicName,
        type: resource.type
      }
      return MainFactory.submitResource(newResourceDetails)
      .then( function() {
        flash.setMessage('Resource submitted!  Grok thanks you.')
        $state.go('home');
      })
    });
  }

});
