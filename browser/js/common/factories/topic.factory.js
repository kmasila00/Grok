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

    addNewTopic: function(title, description){
      return $http.post(baseUrl, {title:title, description:description})
      .then(res => res.data);
    }

  }

});
