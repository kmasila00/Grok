app.config(function ($stateProvider) {

    $stateProvider.state('userProfile', {
        url: '/user',
        templateUrl: 'js/userProfile/user-profile.html',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        // data: {
        //     authenticate: true
        // }
    });

});

app.controller('TabsDemoCtrl', function ($scope, $window) {
  $scope.tabs = [
    { title:'Resources', content:{name:'Resource Name', url:'URL?', description:'Description?'} },
    { title:'Plans', content:{name:'Plan Name', url:'TOPIC?', description:'Description?'} }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

  $scope.model = {
    name: 'Tabs'
  };
});