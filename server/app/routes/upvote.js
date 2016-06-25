var router= require('express').Router();

var Vote = require('../../db/models/vote');
var VoteRelationship= Vote.voteRelationship;
var VoteResource= Vote.voteResource;
var VotePlan= Vote.votePlan;

module.exports= router;


//Vote Resource
router.post('/resource', function(req, res, next){
	VoteResource.findOrCreate({
		userId: req.body.userId,
		resourceId: req.body.resourceId
	})
	.then(voteResource => res.status(201).send(voteResource))
  	.catch(next);
});

router.delete('/resource', function(req, res, next){
	VoteResource.destroy({where:{
		userId: req.body.userId,
		resourceId: req.body.resourceId
	}})
	.then(() => res.sendStatus(204))
  	.catch(next);


});

//Vote Plan
router.post('/plan', function(req, res, next){
	VotePlan.findOrCreate({
		userId: req.body.userId,
		planId: req.body.planId
	})
	.then(votePlan => res.status(201).send(votePlan))
  	.catch(next);

});

router.delete('/plan', function(req, res, next){
	VotePlan.destroy({where:{
		userId: req.body.userId,
		planId: req.body.planId
	}})
	.then(() => res.sendStatus(204))
  	.catch(next);

});

//Vote Relationship
router.post('/relationship', function(req, res, next){
	VoteRelationship.findOrCreate({
		userId: req.body.userId,
		prerequisiteId: req.body.prerequisiteId
	})
	.then(voteRelationship => res.status(201).send(voteRelationship))
  	.catch(next);

})

router.delete('/relationship', function(req, res, next){
	VoteRelationship.destroy({where:{
		userId: req.body.userId,
		prerequisiteId: req.body.prerequisiteId
	}})
	.then(() => res.sendStatus(204))
  	.catch(next);


});
