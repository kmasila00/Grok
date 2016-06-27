app.factory('TopicFactory', function($http) {

  var baseUrl = '/api/topics/';

  var obj= {

    fetchAll: function() {
      return $http.get(baseUrl)
      .then(res => res.data);
    },

    fetchById: function(id) {
      return $http.get(baseUrl + id)
      .then(res => res.data);
    },

    updateTopic: function(topic){
      return $http.put(baseUrl + topic.id, topic)
      .then(res => res.data);
    },

    deleteTopic: function(id){
      return $http.delete(baseUrl + id)
      .then( ()=> obj.fetchAll());

    }

  }
  return obj;

});
