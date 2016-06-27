'use strict';
var router = require('express').Router();
var Auth = require('../configure/auth-middleware');

module.exports = router;

router.use('/users', require('./user'));
router.use('/topics', require('./topic'));
router.use('/resources', require('./resource'));
router.use('/tags', require('./tags'));
router.use('/upvote', require('./upvote'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
