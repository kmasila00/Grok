'use strict';
var express = require('express');
var router = express.Router();
var Resource = require('../../db/').model('resource');

module.exports = router;

router.param('resourceId', function(req, res, next, id) {
  Resource.findById(id)
  .then(function(resource) {
    if (!resource) res.sendStatus(404);
    req.resource = resource;
    next();
  }).catch(next)
})

router.get('/', function(req, res, next) {
	Resource.findAll({})
	.then(resources => res.send(resources));
})

router.post('/', function(req,res,next){
	Resource.create(req.body)
	.then(function(newResource){
		res.send(newResource);
	})
});

router.get('/:resourceId', function(req, res, next){
	res.send(req.resource);
});


// ============================== ADMIN ROUTES ==============================


router.put('/:resourceId', function(req,res,next){
	// Resource may be editted by original user or admin
	if(req.user && (req.user.id === req.resource.userId || req.user.isAdmin )){
		req.resource.update(req.body)
		.then(updatedResource => res.status(200).send(updatedResource));
	} else {
		var err = new Error('To change this you must be the user who submitted this resource or an Admin');
		err.status = 401;
		throw err;
	}
});

router.delete('/:id', function(req,res, next){
	if(req.user && req.user.isAdmin){
		req.resource.destroy({
			where:{
				id: req.params.id
			}
		})
		.then( function() {
			res.sendStatus(204);
		})
		.catch(next);
	} else {
		var err = new Error('Admin access is required to delete resources');
		err.status = 401;
		throw err;
	}
});
