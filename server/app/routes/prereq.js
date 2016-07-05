'use strict';
var express = require('express');
var router = express.Router();
var Prereq = require('../../db/').model('prerequisites');


module.exports = router;

router.get('/', function(req, res, next){
	Prereq.findAll()
	.then(function(data){
		res.send(data);
	})
	.catch(next);
});