app.directive('myPlan', function ($rootScope) {
  return {
    restrict: 'E',
    scope: {
      plan: '='
    },
    templateUrl: 'js/common/directives/plans/my-plan.html',
    link: function (scope) {


    }
  }
});
