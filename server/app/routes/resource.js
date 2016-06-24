'use strict';
var express = require('express');
var router = express.Router();
var Resource = require('../../db/').model('resource');

module.exports = router;

router.get('/:id', function(req, res, next){
	Resource.findAll({
		where:{
			id: req.params.id
		}
	})
	.then(function(allResources){
		res.send(allResources);
	})
});

router.post('/', function(req,res,next){
	Resource.create(req.body)
	.then(function(newResource){
		res.send(newResource);
	})
});

router.put('/', function(req,res,next){
	// checks to see if user is logged in
	// checks to see if the user id is the same as the userId on the resource object
	if(req.user && req.user.id === req.body.resource.userId){
		Resource.update(req.body.resource)
		.then()
	// if user is admin, they can just change it
	} else if(req.user.isAdmin){
		Resource.update(req.body.resource)
		.then()
	} else {
		var err = new Error('To change this you must be the user who submitted this resource or an Admin');
		err.status = 401;
		throw err;
	}
});

router.delete('/', function(req,res, next){
	if(req.user.isAdmin){
		Resource.destroy({
			where:{
				id: req.body.resource.id
			}
		})
		.then()
	}
});


