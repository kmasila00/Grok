app.factory('PrereqFactory', function($http, TopicFactory){

	var baseUrl = '/api/prerequisites/';

	var prereqFactory= {

		fetchAll: function(){
			return $http.get(baseUrl)
			.then(res => res.data);
		},

		removeRelationship: function(obj){
			return $http.delete(baseUrl + '/topic/' + obj.topicId + '/prereq/' + obj.prerequisiteId)
			.then(res => res.data);
		}

	}

	return prereqFactory;

})