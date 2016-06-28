'use strict'

var router = require('express').Router();
var db = require('../../db');
var Topic = db.model('topic');
var Resource = db.model('resource');
var Tag = db.model('tag');
var Vote = require('../../db/models/vote');
var Prerequisite = db.model('prerequisites');
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var Auth = require('../configure/auth-middleware');


module.exports = router;

router.param('topicId', function(req, res, next, id) {
  Topic.findById(id)
  .then( function(topic) {
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
      whereCondition = { status: 'approved' };
  if(req.user && req.user.isAdmin) whereCondition = {}; // show all
  Topic.findAll({ where: whereCondition })
  .then(topics => res.send(topics))
  .catch(next);
});

router.post('/', function(req, res, next) {
  Topic.create(req.body)
  .then(topic => res.status(201).send(topic))
  .catch(next);
});

// Get a single topic, with all its prequisites and subsequent topics
// Raw SQL queries are helpful to simplify pulling prereq/subseq topics
router.get('/:topicId', function(req, res, next) {

  var baseQuery = Topic.findById(req.params.topicId, {
                  include: [{
                    model: Resource,
                      include: [ Tag, { model: Vote.voteResource, as: 'votes' }]
                  }]}),
      prereqQuery = 'SELECT * FROM topics INNER JOIN prerequisites AS p ON topics.id = p."prerequisiteId" WHERE p."topicId" = ' + req.params.topicId,
      subseqQuery = 'SELECT * FROM topics INNER JOIN prerequisites AS p ON topics.id = p."topicId" WHERE p."prerequisiteId" = ' + req.params.topicId;

  Promise.all([
    baseQuery,
    db.query(prereqQuery, { type: Sequelize.QueryTypes.SELECT }),
    db.query(subseqQuery, { type: Sequelize.QueryTypes.SELECT })
  ])
  .spread( function(topic, prereqTopics, subseqTopics) {
    topic.dataValues.prereqTopics = prereqTopics;
    topic.dataValues.subseqTopics = subseqTopics;
    res.json(topic);
  })
  .catch(next);

});

// Add a prerequisite to a given topic
router.post('/:topicId/prerequisite', Auth.assertAuthenticated, function(req, res, next) {
  var prereqName = req.body.title;
  Topic.findOne({ where: { title: prereqName }})
  .then( function(prereq) {
    return req.topic.addPrerequisite(prereq);
  })
  .then(topic => res.status(200).send(topic))
  .catch(next);
});


// ============================== ADMIN ROUTES ==============================

router.put('/:topicId', function(req, res, next) {
  if(req.user && req.user.isAdmin){
    req.topic.update(req.body)
    .then(topic => res.status(200).json(topic))
    .catch(next);
  } else {
    var err = new Error('You must be an admin to update a topic');
    err.status = 401;
    throw err;
  }
});

router.delete('/:topicId', function(req, res, next) {
  if(req.user && req.user.isAdmin){
    req.topic.destroy()
    .then(function(){
      // we should replace these with model hooks to delete associations when a given topic is deleted
      return Promise.all([Resource.destroy({where:{ topicId: req.topic.id}})]);
    })
    .then(() => res.status(200).end())
    .catch(next);
  } else {
    var err = new Error('You must be an admin to delete a topic');
    err.status = 401;
    throw err;
  }
});
