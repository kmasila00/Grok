'use strict';
var express = require('express');
var router = express.Router();
var Resource = require('../../db/').model('resource');
var Tag = require('../../db/').model('tag');
var Plan = require('../../db/').model('plan');

module.exports = router;

router.param('resourceId', function(req, res, next, id) {
  Resource.findById(id)
  .then(function(resource) {
    if (!resource) res.sendStatus(404);
    req.resource = resource;
    next();
  }).catch(next)
})

//Creates a new plan
router.post('/', function(req, res, next){
	Plan.create(req.body)
	.then(function(newPlan){
		return res.send(newPlan);
	})
	.catch(next);
});

//Gets all plans for a specific topic
router.get('/:topicId', function(req, res, next){
	Plan.findAll({
		where:{
			topicId: req.params.topicId
		}
	})
	.then(function(topics){
		res.send(topics);
	})
	.catch(next);
});

//adds resource to a specific plan
//double check please
router.post('/:resourceId/:planId', function(req, res, next){
	Plan.findOne({
		where:{
			id: req.params.planId
		}
	})
	.then(function(foundPlan){
		var plan = foundPlan;
		return plan.addResource(req.resource)
	})
	.then(function(){
		res.send();
	})
	.catch(next);
		
});

//delete a whole plan
router.delete('/:id', function(req, res, next){
	Plan.destroy({
		where:{
			id: req.params.id
		}
	})
	.then(function(){
		res.send();
	})
});

//delete a resource??

