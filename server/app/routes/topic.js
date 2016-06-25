'use strict'

var router = require('express').Router();
var db = require('../../db');
var Topic = db.model('topic');
var Resource = db.model('resource');
var Prerequisite = db.model('prerequisites');
var Sequelize = require('sequelize');

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
      whereCondition = { status: 'Approved' };
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

router.get('/:topicId', function(req, res) {

  var prereqQuery = 'SELECT * FROM topics INNER JOIN prerequisites AS p ON topics.id = p."prerequisiteId" WHERE p."topicId" = ' + req.params.topicId,
      subseqQuery = 'SELECT * FROM topics INNER JOIN prerequisites AS p ON topics.id = p."topicId" WHERE p."prerequisiteId" = ' + req.params.topicId;

  // Find all prerequisites
  db.query(prereqQuery, { type: Sequelize.QueryTypes.SELECT })
  .then( function(prereqTopics) {
    req.topic.dataValues.prereqTopics = prereqTopics;
    // Find all subsequent topics
    return db.query(subseqQuery, { type: Sequelize.QueryTypes.SELECT });
  })
  .then( function(subseqTopics) {
    req.topic.dataValues.subseqTopics = subseqTopics;
    res.json(req.topic);
  })

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
