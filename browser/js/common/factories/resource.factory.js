app.factory('ResourceFactory', function($http){
	var baseUrl = '/api/resources/';
	return {

		fetchAll: function(){
			return $http.get(baseUrl)
			.then(res => res.data);
		},
		fetchById: function(id){
			return $http.get(baseUrl+id)
			.then(res => res.data);
		},
		updateResource: function(resource){
			console.log("Got to updateResource in factory");
		  return $http.put(baseUrl + resource.id, resource)
		  .then(res => res.data);
		},
		deleteResource: function(id){
			return $http.delete(baseUrl+id)
			.then(() => obj.fetchAll());
		},
		addNewResource: function(title, description){
	      return $http.post(baseUrl, {title:title, description:description})
	      .then(res => res.data);
	    }

	}

});