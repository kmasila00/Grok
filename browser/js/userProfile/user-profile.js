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
    $scope.userUpdate = cloneObj(currentUser);
    $scope.updateUser = UsersFactory.updateUser;
    $scope.reset =  function() { $scope.userUpdate =  cloneObj(currentUser) };

    $scope.tabs = [
        { title:'Resources', content:[] },
        { title:'Plans', content:[] }
    ];


    ResourceFactory.fetchByUser(currentUser.id)
                   .then(function(Resources){ $scope.tabs[0].content = Resources; });

});

function cloneObj(obj) { return Object.assign({}, obj) };
