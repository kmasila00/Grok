app.factory('TopicFactory', function($http) {

  var baseUrl = '/api/topics/';

  return {

    fetchAll: function() {
      $http.get(baseUrl)
      .then(res => res.data);
    }

  }

});
