app.config(function ($stateProvider) {
    $stateProvider.state('plan', {
        url: '/plan',
        templateUrl: 'js/plan/plan.html',
        controller: 'PlanCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('PlanCtrl', function($scope, PlanFactory, currentUser){

    PlanFactory.fetchPlansByUser(currentUser.id)
    .then(function(Plans){ 
        $scope.userPlans = Plans; 
    });

    $scope.removePlan = function(id) {
        PlanFactory.removePlan(id).then(function(data) {
            PlanFactory.fetchPlansByUser(currentUser.id)
            .then(function(Plans) { $scope.userPlans = Plans; });
        });
    };
      
    $scope.removeFromPlan = function(planId, resourceId){
        console.log('hi');
        PlanFactory.removeResourceFromPlan(planId, resourceId)
        .then(function(data){
            console.log('here');
            PlanFactory.fetchPlansByUser(currentUser.id)
            .then(function(Plans){ 
                console.log("kjdfhsdkjfhsdjfhsd");
                $scope.userPlans = Plans
            });
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
