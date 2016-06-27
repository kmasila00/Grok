app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, SignupFactory, $state) {
  $scope.error = null;
  $scope.signup = function() {
    SignupFactory.createUser($scope.newUser)
    .then(function(data) {
        $state.go('home');
    })
    .catch(function(err) {
        $scope.error = err.data;
    });
  }
});

app.factory('SignupFactory', function ($http) {
  var SignupFactory = {};

  SignupFactory.createUser = function (newUser) {
    return $http.post('/api/users', newUser)
    .then(function (createdUser) {
      return createdUser.data;
    });
  };

  return SignupFactory;
})
