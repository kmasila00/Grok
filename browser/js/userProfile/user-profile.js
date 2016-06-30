app.config(function ($stateProvider) {

    $stateProvider.state('userProfile', {
        url: '/user',
        templateUrl: 'js/userProfile/user-profile.html',
        controller: 'UserProfileCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('UserProfileCtrl', function ($scope, UsersFactory, ResourceFactory, PlanFactory, currentUser) {
    $scope.error = null;
    $scope.userUpdate = cloneObj(currentUser);
    $scope.updateUser = UsersFactory.updateUser;
    $scope.reset =  function() { $scope.userUpdate =  cloneObj(currentUser) };

    $scope.tabs = [
        { title:'Resources', content:[] },
        { title:'Plans', content:[] }
    ];

    $scope.removePlan = function(id) {
        PlanFactory.removePlan(id).then(function(data) {
            PlanFactory.fetchPlansByUser(currentUser.id)
                       .then(function(Plans) { $scope.tabs[1].content = Plans; });
        });
    };

    ResourceFactory.fetchByUser(currentUser.id)
                   .then(function(Resources) { $scope.tabs[0].content = Resources; });

    PlanFactory.fetchPlansByUser(currentUser.id)
                   .then(function(Plans) { $scope.tabs[1].content = Plans; });
});

function cloneObj(obj) { return Object.assign({}, obj) };
