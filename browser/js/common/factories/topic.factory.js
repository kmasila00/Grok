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

    suggestTopic: function(type, topicId, newTopicName) {
      // convert to route format
      if(type === 'prereq') type = 'prerequisite';
      else if(type === 'subseq') type = 'subsequent';

      return $http.post(baseUrl + topicId + '/' + type, { title: newTopicName });
    }

  }
  return obj;

});
