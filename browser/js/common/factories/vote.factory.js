app.factory('VoteFactory', function($http) {

  return {

    // Resolves to true if the vote was successfully added
    addResourceVote: function(resourceId) {
      return $http.post('/api/upvote/resource', { resourceId: resourceId })
      .then( function(res) {
        if(res.status === 201) return true;
        return false;
      })
    },

    // Resolves to true if the vote was successfully deleted
    rmResourceVote: function(resourceId) {
      return $http.delete('/api/upvote/resource/' + resourceId)
      .then( function(res) {
        if(res.status === 204) return true;
        return false;
      })
    }


  }

});
