app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, SignupFactory, $state) {
  $scope.signup = function() {
    SignupFactory.createUser($scope.newUser)
    .then(function () {
      $state.go('home');
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