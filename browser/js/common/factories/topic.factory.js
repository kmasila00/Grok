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

    addNewTopic: function(title, description){
      return $http.post(baseUrl, {title:title, description:description})
      .then(res => res.data);
    },

    updateTopic: function(topic){
      return $http.put(baseUrl + topic.id, topic)
      .then(res => res.data);
    },

    deleteTopic: function(id){
      return $http.delete(baseUrl + id)
      .then( ()=> obj.fetchAll());

    },

    addPrerequisite: function(topicId, prerequisite) {
      console.log(prerequisite)
      return $http.post(baseUrl + topicId + '/prerequisite', { title: prerequisite });
    }

  }
  return obj;

});
