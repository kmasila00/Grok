app.factory('FlagFactory', function($http){
	var baseUrl = '/api/topics/';
	var obj= {
		fetchTopicFlags: function(id){
			return $http.get(baseUrl+ id +'/flags')
			.then( res => res.data);
		},
		fetchResourceFlags: function(id){
			return $http.get('/api/resources/'+ id +'/flags')
			.then( res => res.data);
		},
		deleteTopicFlag: function(flagId, topicId){
			return $http.delete(baseUrl +'/flags/'+ flagId)
			.then( () => obj.fetchTopicFlags(topicId));
		},
		deleteResourceFlag: function(id, resourceId){
			return $http.delete('/api/resources/'+ id+ '/flags')
			.then( () => obj.fetchResourceFlags(resourceId));
		}

	}
	return obj;

});