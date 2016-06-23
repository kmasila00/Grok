'use strict';
var express = require('express');
var router = express.Router();
var User = require('../../db/').model('user');

module.exports = router;

router.param('userId', function(req, res, next, id) {
    User.findById(id)
        .then(function(user) {
            req.targetUser = user;
            next();
        })
        .catch(next);
});

router.get('/:userId', function(req, res, next) {
    res.json(req.targetUser);
});

router.post('/', function(req, res, next) {
    User.findOrCreate({
        where: { 
            name: req.body.name,
            email: req.body.email
        },
            defaults: { password: req.body.password }
        })
        .spread(function(user, created) {
            if (!created) {
                res.json('this user already exists!')
            } else {
                res.json(user);
            }
        })
        .catch(next);
});

router.put('/:userId', function(req, res, next) {
    req.targetUser.update(req.body)
        .then(function(updatedUser) {
            res.json(updatedUser);
        })
        .catch(next);
});

// ============================== ADMIN ROUTES ==============================
router.get('/', function(req, res, next) {
    if(req.user.isAdmin === true) {
        User.findAll()
            .then(users => res.json(users))
            .catch(next);
    } else {
        var err = new Error('You must be an admin to get all users');
        err.status = 401;
        throw err;
    } 
});

router.delete('/:userId', function(req, res, next) {
    if (req.user.isAdmin === true) {
        req.targetUser.destroy()
        .then(function() {
            res.sendStatus(204);
        })
        .catch(next);
    } else {
        var err = new Error('You must be an admin to delete a user');
        err.status = 401;
        throw err;
    }
});

