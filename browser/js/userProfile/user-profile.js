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

    function cloneObj(obj) { return Object.assign({}, obj) };

    $scope.error = null;
    $scope.userUpdate = cloneObj(currentUser);
    $scope.updateUser = UsersFactory.updateUser;
    $scope.reset = function() { $scope.userUpdate = cloneObj(currentUser) };

    ResourceFactory.fetchByUser(currentUser.id)
                   .then(function(Resources) { $scope.resources = Resources; });

});
