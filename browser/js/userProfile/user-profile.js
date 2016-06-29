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

app.controller('UserProfileCtrl', function ($scope, UsersFactory, currentUser) {
    $scope.user = currentUser;
    $scope.userUpdate = $scope.user;
    $scope.updateUser = UsersFactory.updateUser;
    $scope.reset = function() { $scope.user = $scope.user };
});
