'use strict'

var router = require('express').Router();
var db = require('../../db');
var Tag = db.model('tag');
var Resource = db.model('resource');

module.exports = router;

router.param('tagId', function(req, res, next, id) {
  Tag.findById(id, { include: [ Resource ] })
  .then(function(topic) {
    //next shouldn't be called if you send a response - CXL
    if (!topic) res.sendStatus(404)
    req.tag = tag;
    next();
  }).catch(next)
})


// Get all tags
router.get('/', function(req, res, next) {
  Tag.findAll({})
  .then(tags => res.send(tags))
  .catch(next);
});

// Create a new tag
router.post('/', function(req, res, next) {
  Tag.create(req.body)
  .then(tag => res.status(201).send(tag))
  .catch(next);
});

// Get a specific tag
// Includes all associated resources
router.get('/:tagId', function(req, res) {
  res.json(req.tag);
});

// Assign a tag to a given resource



// ============================== ADMIN ROUTES ==============================

// Update a tag
router.put('/:tagId', function(req, res, next) {
  if(req.user && req.user.isAdmin){
    req.tag.update(req.body)
    .then(tag => res.status(200).json(tag))
    .catch(next);
  } else {
    var err = new Error('You must be an admin to update a tag');
    err.status = 401;
    throw err;
  }
});

// Delete a tag
router.delete('/:tagId', function(req, res, next) {
  if(req.user && req.user.isAdmin){
    req.tag.destroy()
    .then(() => res.status(200).end())
    .catch(next);
  } else {
    var err = new Error('You must be an admin to delete a tag');
    err.status = 401;
    throw err;
  }
});
