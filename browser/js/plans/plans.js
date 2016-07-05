app.config(function ($stateProvider) {
    $stateProvider.state('plans', {
        url: '/plans',
        templateUrl: 'js/plans/plans.html',
        controller: 'PlansCtrl',
        resolve: {
            plans: function(PlanFactory, $rootScope, AuthService) {
              if(!$rootScope.user) { // necessary if a user reloads the plan page
                return AuthService.getLoggedInUser()
                .then( function(user) {
                  return PlanFactory.fetchPlansByUser(user.id)
                })
              } else {
                return PlanFactory.fetchPlansByUser($rootScope.user.id)
              }
            }
        }
    });
});

app.controller('PlansCtrl', function($scope, PlanFactory, plans, $rootScope){

  $scope.plans = plans;

  var userId;
  if($rootScope.user) userId = $rootScope.user.id;

  $scope.currentPlan = $scope.plans[0];
  $scope.showPlan = function(planId) {
    console.log('switching to plan', planId)
    $scope.currentPlan = $scope.plans[getPlanById(planId)];
    console.log($scope.currentPlan);
  }

  function getPlanById(id) {
    for(var i=0; i<$scope.plans.length; i++) {
      if($scope.plans[i].id === id) return i;
    }
  }

  // default view = first plan





  $scope.removePlan = function(id) {
      PlanFactory.removePlan(id).then(function() {
          return PlanFactory.fetchPlansByUser(userId)
      })
      .then(function(Plans) { $scope.userPlans = Plans; });
  };

  $scope.removeFromPlan = function(planId, resourceId){
      PlanFactory.removeResourceFromPlan(planId, resourceId)
      .then(function(){
          return PlanFactory.fetchPlansByUser(userId)
      })
      .then(function(Plans){
          $scope.userPlans = Plans
      });
  }

  $scope.moveUp = function(plan, resourceId){
      var rArr = plan.resources;

      for(var i = 1; i < rArr.length; i++){

            if(rArr[i].id === resourceId){
              var temp = rArr[i];
              rArr[i] = rArr[i-1];
              rArr[i-1] = temp;
            }

      }
  }

  $scope.moveDown = function(plan, resourceId){
      var rArr = plan.resources;

      for(var i = 0; i < rArr.length-1; i++){
            if(rArr[i].id === resourceId){
              var temp = rArr[i];
              rArr[i] = rArr[i+1];
              rArr[i+1] = temp;
              break;
            }
      }
  }

})
