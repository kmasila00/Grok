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
    fetchPrereqVotes: function(topicId) {
      return $http.get(upvotePath + 'relationship', { params: {topicId} })
      .then(res => res.data );
    },


    // Resolves to true if the vote was successfully added
    // -- topicId is optional; only used for relationship voting
    addVote: function(type, id, topicId) {
      var idObj = {},
          path = upvotePath;
      if(type === 'prereq') {
        idObj = {
          topicId: topicId,
          prerequisiteId: id
        }
        path += 'relationship';
      } else {
        idObj[type + 'Id'] = id;
        path += type;
      }
      return $http.post(path, idObj)
      .then( function(res) {
        if(res.status === 201) return true;
        return false;
      })
    },

    // Resolves to true if the vote was successfully deleted
    // -- topicId is optional; only used for relationship voting
    removeVote: function(type, id, topicId) {
      var path = upvotePath;
      if(type === 'prereq') {
        path += 'relationship/topic/' + topicId + '/prereq/' + id;
      } else {
        path += type + '/' + id;
      }
      return $http.delete(path)
      .then( function(res) {
        if(res.status === 204) return true;
        return false;
      })
    }


  }

});
