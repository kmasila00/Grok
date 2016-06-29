'use strict';
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Resource = require('../../db/').model('resource');
var Topic = require('../../db/').model('topic');
var Plan = require('../../db/').model('plan');

module.exports = router;

// Sends list of topic titles
router.get('/topics', function(req, res, next){
  Topic.findAll()
  .then( function(dbTopics) {
    var topics = dbTopics.map( function(dbTopic) {
      return dbTopic.title;
    });
    res.json(topics);
  })
  .catch(next);
});

router.post('/resource', function(req, res, next){
  req.body.topicId = 1; // TEMP / DEV
  var topicId = req.body.topicId;
  // req.body.userId = req.user.dataValues.id;

  Promise.all([
    Resource.create(req.body),
    Topic.findOrCreate({ where: { title: req.body.topicName }})
  ])
  .spread(function(newResource, topic){
    return newResource.addTopic(topic[0].id);
  })
  .then(() => res.status(201).end());
});
