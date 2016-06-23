app.config(function ($stateProvider) {

    $stateProvider.state('userProfile', {
        url: '/user',
        template: '<div class="container"><b>Hi!</b></div>',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});
