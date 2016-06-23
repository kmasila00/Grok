'use strict'

var router = require('express').Router();
var Topic = require('../../db').model('topic');
var Auth = require('../configure/auth-middleware');

module.exports = router;

router.param('topicId', function(req, res, next, id) {
  Topic.findById(id)
  .then(function(topic) {
    if (!topic) res.sendStatus(404)
    req.topic = topic;
    next();
  }).catch(next)
})

// Fetches all topics
// -- ordinary users: only approved topics
// -- admins: all topics
router.get('/', function(req, res, next) {
  var user = req.user,
      whereCondition = { status: 'Approved' };
  if(req.user && req.user.isAdmin) whereCondition = {}; // show all
  Topic.findAll({ where: whereCondition })
  .then(topics => res.send(topics))
  .catch(next);
});

router.post('/', function(req, res, next) {
  Topic.create(req.body)
  .then(topic => res.send(topic))
  .catch(next);
});

router.get('/:topicId', function(req, res) {
  res.json(req.topic);
});

router.put('/:topicId', function(req, res, next) {
  if(req.user && req.user.isAdmin) {
    req.topic.update(req.body)
    .then(function(topic){
      res.status(200).json(topic);
    }).catch(next);
  } else {
    res.status(401).end();
  }
});

router.delete('/:topicId', function(req, res, next) {
  if(req.user && req.user.isAdmin) {
    req.topic.destroy()
    .then(function(){
      res.status(200).end();
    }).catch(next)
  } else {
    res.status(401).end();
  }
});
