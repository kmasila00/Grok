app.factory('ResourceFactory', function($http){
	var baseUrl = '/api/resources/';
	var obj= {

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
		}

	}
	return obj;

});