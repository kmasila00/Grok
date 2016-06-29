'use strict';
var express = require('express');
var router = express.Router();
var Resource = require('../../db/').model('resource');
var Tag = require('../../db/').model('tag');
var Plan = require('../../db/').model('plan');

module.exports = router;

//Creates a new plan
router.post('/', function(req, res, next){
	Plan.create({
		name: req.body.name,
		description: req.body.description,
		userId: req.user.dataValues.id,
		topicId: req.body.topicId
	})
	.then(function(newPlan){
		return res.send(newPlan);
	})
	.catch(next);
});

//Gets all plans for a specific topic
router.get('/topic/:topicId', function(req, res, next){
	Plan.findAll({
		where:{
			topicId: req.params.topicId
		},
		include: [Resource]
	})
	.then(function(topics){
		res.send(topics);
	})
	.catch(next);
});

//Gets all plans for a specific user
router.get('/user/:userId', function(req, res, next){
	Plan.findAll({
		where:{
			userId: req.user.dataValues.id
		},
		include:[Resource]
	})
	.then(function(plans){
		res.send(plans);
	})
});


//adds resource to a specific plan
router.post('/:planId/resource/:resourceId', function(req, res, next){
	Plan.findOne({
		where:{
			id: req.params.planId
		}
	})
	.then(function(foundPlan){
		var plan = foundPlan;
		return plan.addResource(req.params.resourceId)
	})
	.then(function(){
		res.send();
	})
	.catch(next);
		
});

//delete a whole plan
router.delete('/:planId', function(req, res, next){
	Plan.destroy({
		where:{
			id: req.params.planId
		}
	})
	.then(function(){
		res.send();
	})
});

//delete a resource??
router.delete('/:planId/resource/:resourceId', function(req, res, next){
	Plan.findOne({
		where:{
			id: req.params.planId
		}
	})
	.then(function(plan){
		plan.removeResource(req.params.resourceId);
	})
});
