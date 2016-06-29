app.factory('FlagFactory', function($http){
	var baseUrl = '/api/topics/';
	var obj= {
		fetchTopicFlags: function(id){
			return $http.get('/api/flags/topic/'+ id )
			.then( res => res.data);
		},
		addTopicFlag: function(id, flag){
			return $http.post('/api/flags/topic/'+ id, flag)
			.then( res => res.data);
		},
		deleteTopicFlag: function(flagId, topicId){
			return $http.delete('/api/flags/topic/'+ flagId)
			.then( () => obj.fetchTopicFlags(topicId));
		},
		fetchResourceFlags: function(id){
			return $http.get('/api/flags/resource/'+ id )
			.then( res => res.data);
		},
		addResourceFlag: function(id, flag){
			return $http.post('/api/flags/resource/'+ id, flag)
			.then( res => res.data);
		},
		deleteResourceFlag: function(flagId, resourceId){
			return $http.delete('/api/flags/resource/'+ flagId)
			.then( () => obj.fetchResourceFlags(resourceId));
		}

	}
	return obj;

});