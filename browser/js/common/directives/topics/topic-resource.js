app.directive('topicResource', function (AuthService, TopicFactory, VoteFactory) {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'js/common/directives/topics/topic-resource.html',
    link: function (scope, element, attrs, TopicCtrl) {

      scope.numVotes = {};

      scope.upvoteResource = function(resourceId) {
        if(AuthService.isAuthenticated()) {
          VoteFactory.addResourceVote(resourceId)
          .then( function(success) {
            if(success) {
              toggleVoteButton(resourceId);
              incrementVoteCount(resourceId, 1);
            }
          })
        }
      }

      scope.devoteResource = function(resourceId) {
        if(AuthService.isAuthenticated()) {
          VoteFactory.rmResourceVote(resourceId)
          .then( function(success) {
            if(success) {
              toggleVoteButton(resourceId);
              incrementVoteCount(resourceId, -1);
            }
          })
        }
      }

      function toggleVoteButton(resourceId) {
        $('#btn-upvote-' + resourceId).toggleClass('hidden');
        $('#btn-voted-' + resourceId).toggleClass('hidden');
      }

      function incrementVoteCount(resourceId, amount) {
        amount = amount || 1; // add by default
        if(!scope.numVotes[resourceId]) scope.numVotes[resourceId] = amount;
        else scope.numVotes[resourceId] += amount;
      }

    }
  }
});
