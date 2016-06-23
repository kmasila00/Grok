'use strict'

var router = require('express').Router();
var Topic = require('../../db').model('topic');

module.exports = router;

router.param('topicId', function(req, res, next, id) {
  Topic.findById(id)
  .then(function(topic) {
    if (!topic) res.sendStatus(404)
    req.topic = topic;
    next();
  }).catch(next)
})

router.get('/', function(req, res, next) {
  Topic.findAll()
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
  req.topic.update(req.body)
  .then(function(topic){
    res.status(200).json(topic);
  }).catch(next)
});

router.delete('/:topicId', function(req, res, next) {
  req.category.destroy()
  .then(function(){
    res.sendStatus(204);
  }).catch(next)
});

