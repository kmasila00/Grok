app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'MainController',
    resolve: {
    }
  });

  $stateProvider.state('addResource', {
    url: '/',
    templateUrl: 'views/addResource.html',
    controller: 'MainController',
    resolve: {
      topics: function(MainFactory) {
        return MainFactory.fetchTopics();
      }
    }
  });

});
