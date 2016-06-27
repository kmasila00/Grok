var router = require('express').Router();

var Vote = require('../../db/models/vote');
var VoteRelationship = Vote.voteRelationship;
var VoteResource = Vote.voteResource;
var VotePlan = Vote.votePlan;
var Auth = require('../configure/auth-middleware');


module.exports = router;


// Vote Resource
// -- Get all votes for a list of Resources, or all votes for all Resources by default
router.get('/resource', function(req, res, next) {
	var whereCondition = {};
	if(req.query && req.query.resourceIds) {
		whereCondition = { where: { resourceId: { $in: req.query.resourceIds } } };
	}
	VoteResource.findAll(whereCondition)
	.then(votes => res.send(votes))
	.catch(next);
});

router.post('/resource', Auth.assertAuthenticated, function(req, res, next){
	VoteResource.findOrCreate({ where: {
		userId: req.user.id,
		resourceId: req.body.resourceId
	}})
	.then(voteResource => res.sendStatus(201))
  .catch(next);
});

router.delete('/resource/:resourceId', Auth.assertAuthenticated, function(req, res, next){
	VoteResource.destroy({ where: {
		userId: req.user.id,
		resourceId: req.params.resourceId
	}})
	.then(() => res.sendStatus(204))
  .catch(next);
});

//Vote Plan
router.post('/plan', function(req, res, next){
	VotePlan.findOrCreate({ where: {
		userId: req.user.id,
		planId: req.body.planId
	}})
	.then(votePlan => res.sendStatus(201))
  .catch(next);
});

router.delete('/plan', function(req, res, next){
	VotePlan.destroy({ where: {
		userId: req.user.id,
		planId: req.body.planId
	}})
	.then(() => res.sendStatus(204))
  .catch(next);
});

//Vote Relationship
router.post('/relationship', function(req, res, next){
	VoteRelationship.findOrCreate({
		userId: req.user.id,
		prerequisiteId: req.body.prerequisiteId
	})
	.then(voteRelationship => res.sendStatus(201))
  .catch(next);
})

router.delete('/relationship', function(req, res, next){
	VoteRelationship.destroy({ where: {
		userId: req.user.id,
		prerequisiteId: req.body.prerequisiteId
	}})
	.then(() => res.sendStatus(204))
  .catch(next);
});
