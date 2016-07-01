app.factory('PrereqFactory', function($http){

	var baseUrl = '/api/prerequisites/';

	return {

		fetchAll: function(){
			return $http.get(baseUrl)
			.then(res => res.data);
		}

	}

})