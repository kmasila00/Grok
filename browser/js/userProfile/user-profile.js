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

app.controller('UserProfileCtrl', function ($scope, UsersFactory, ResourceFactory, currentUser) {
    $scope.error = null;
    $scope.user = currentUser;
    $scope.userUpdate = $scope.user;
    $scope.updateUser = UsersFactory.updateUser;
    $scope.reset = function() { $scope.userUpdate = $scope.user; };
    $scope.tabs = [
        { title:'Resources', content:[] },
        { title:'Plans', content:[] }
    ];

    ResourceFactory.fetchAll({ where:{ userId: $scope.user.id } })
                   .then(function(Resources){ $scope.tabs[0].content = Resources; });

});

