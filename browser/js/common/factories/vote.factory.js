app.factory('VoteFactory', function($http) {

  const upvotePath = '/api/upvote/';

  return {

    // Returns array of existing votes for all resources
    fetchResourceVotes: function() {
      return $http.get(upvotePath + 'resource')
      .then(res => res.data)
    },

    // Resolves to true if the vote was successfully added
    addResourceVote: function(resourceId) {
      return $http.post(upvotePath + 'resource', { resourceId: resourceId })
      .then( function(res) {
        if(res.status === 201) return true;
        return false;
      })
    },

    // Resolves to true if the vote was successfully deleted
    rmResourceVote: function(resourceId) {
      return $http.delete(upvotePath + 'resource/' + resourceId)
      .then( function(res) {
        if(res.status === 204) return true;
        return false;
      })
    }


  }

});
