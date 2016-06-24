var router= require('express').Router();

var Vote = require('../../db/models/vote');
var VoteRelationship= Vote.voteRelationship;
var VoteResource= Vote.voteResource;
var VotePlan= Vote.votePlan;

module.exports= router;


//Vote Resource
router.post('/resource', function(req, res){
	VoteResource.create({
		userId: req.body.userId,
		resourceId: req.body.resourceId
	});

});

router.delete('/resource', function(req, res){
	VoteResource.destroy({where:{
		userId: req.body.userId,
		resourceId: req.body.resourceId
	}});

});

//Vote Plan
router.post('plan', function(req, res){
	VotePlan.create({
		userId: req.body.userId,
		resourceId: req.body.resourceId
	});

})

router.delete('/plan', function(req, res){
	VotePlan.destroy({where:{
		userId: req.body.userId,
		resourceId: req.body.resourceId
	}});

});

//Vote Relationship
router.post('relationship', function(req, res){
	VoteRelationship.create({
		userId: req.body.userId,
		resourceId: req.body.resourceId
	});

})

router.delete('/relationship', function(req, res){
	VoteRelationship.destroy({where:{
		userId: req.body.userId,
		resourceId: req.body.resourceId
	}});

});
