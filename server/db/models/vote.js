'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var voteResource = db.define('voteResource', {});
var votePlan = db.define('votePlan', {});
var voteRelationship = db.define('voteRelationship', {});

module.exports = {
	voteResource: voteResource,
	votePlan: votePlan,
	voteRelationship: voteRelationship
} //if you're using es6, you can just write {voteResource, votePlan, voteRelationship}, if your keyname is the same as the variable name -CXL
