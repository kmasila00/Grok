app.factory('PlanFactory', function($http) {

  var baseUrl = '/api/plans/';

  return {

    addNewPlan: function(name, description){
      return $http.post(baseUrl, {name:name, description:description})
      .then(res => res.data);
    }

  }

});