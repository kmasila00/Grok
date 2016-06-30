app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'MainController',
    resolve: {
      topics: function(MainFactory) {
        return MainFactory.fetchTopics();
      }
    }
  });

});
