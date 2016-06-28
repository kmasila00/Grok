app.factory('FlagFactory', function($http){
	var baseUrl = '/api/topics/';
	var obj= {
		fetchTopicFlags: function(id){
			return $http.get(baseUrl+ id +'/flags')
			.then( res => res.data);
		},
		deleteTopicFlag: function(id){
			console.log("Got over here whats up");
			return $http.delete(baseUrl +'/flags/'+ id)
			.then( res => res.data);
		}

	}
	return obj;

});