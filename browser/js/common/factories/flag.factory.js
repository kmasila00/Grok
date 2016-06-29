app.factory('FlagFactory', function($http){
	var baseUrl = '/api/topics/';
	var obj= {
		fetchTopicFlags: function(id){
			return $http.get(baseUrl+ id +'/flags')
			.then( res => res.data);
		},
		addTopicFlag: function(id, flag){
			return $http.post(baseUrl+ id +'/flags', flag)
			.then( res => res.data);
		},
		deleteTopicFlag: function(flagId, topicId){
			return $http.delete(baseUrl +'/flags/'+ flagId)
			.then( () => obj.fetchTopicFlags(topicId));
		},
		fetchResourceFlags: function(id){
			return $http.get('/api/resources/'+ id +'/flags')
			.then( res => res.data);
		},
		addResourceFlag: function(id, flag){
			return $http.post('/api/resources/'+ id +'/flags', flag)
			.then( res => res.data);
		},
		deleteResourceFlag: function(id, resourceId){
			return $http.delete('/api/resources/flags/'+id)
			.then( () => obj.fetchResourceFlags(resourceId));
		}

	}
	return obj;

});