app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/adminPanel/admin.html',
        controller: 'AdminCtrl'
    });

});

app.controller('AdminCtrl', function ($scope) {



});