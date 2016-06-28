app.factory('VoteFactory', function($http) {

  const upvotePath = '/api/upvote/';

  return {

    // Returns array of existing votes for all resources
    // -- Takes an array of resource IDs to pull votes for
    // -- If omitted, pulls all votes
    fetchResourceVotes: function(resourceIds) {
      return $http.get(upvotePath + 'resource', { params: {resourceIds} })
      .then(res => res.data );
    },

    // Returns array of existing votes for all prerequisites of a topic
    fetchRelationshipVotes: function(topicId) {
      return $http.get(upvotePath + 'relationship', { params: {topicId} })
      .then(res => res.data );
    },


    // Resolves to true if the vote was successfully added
    // -- topicId is optional; only used for relationship voting
    addVote: function(type, id, topicId) {
      var idObj = {};
      if(type === 'relationship') {
        idObj = {
          topicId: topicId,
          prerequisiteId: id
        }
      } else idObj[type + 'Id'] = id;
      return $http.post(upvotePath + type, idObj)
      .then( function(res) {
        if(res.status === 201) return true;
        return false;
      })
    },

    // Resolves to true if the vote was successfully deleted
    // -- topicId is optional; only used for relationship voting
    removeVote: function(type, id, topicId) {
      var path = upvotePath + type + '/' + id;
      if(type === 'relationship') path += '/topic/' + topicId;
      return $http.delete(path)
      .then( function(res) {
        if(res.status === 204) return true;
        return false;
      })
    }


  }

});
