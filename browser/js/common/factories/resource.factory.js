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
		  return $http.put(baseUrl + resource.id, resource)
		  .then(res => res.data);
		},
		deleteResource: function(id){
			return $http.delete(baseUrl+id)
			.then(() => obj.fetchAll());
		},
		addTag: function(resourceId, tag) {
			return $http.post(baseUrl + resourceId + '/tag', { tagName: tag });
		}

	}
	return obj;

});
