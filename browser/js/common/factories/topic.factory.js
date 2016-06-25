app.factory('TopicFactory', function($http) {

  var baseUrl = '/api/topics/';

  return {

    fetchAll: function() {
      return $http.get(baseUrl)
      .then(res => res.data);
    },

    fetchById: function(id) {
      return $http.get(baseUrl + id)
      .then(res => res.data);
    },

  }

});
