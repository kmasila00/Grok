app.factory('ResourceFactory', function($http) {

  var baseUrl = '/api/resources/';

  return {

    addNewResource: function(title, description){
      return $http.post(baseUrl, {title:title, description:description})
      .then(res => res.data);
    }

  }

});