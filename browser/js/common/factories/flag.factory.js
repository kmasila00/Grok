app.factory('FlagFactory', function($http){
	var baseUrl = '/api/topics/';
	var obj= {
		fetchTopicFlags: function(id){
			return $http.get(baseUrl+ id +'/flags')
			.then( (res) => {
				console.log("BAck in factory with response",res.data);
				return res.data
			});
		}

	}
	return obj;

});