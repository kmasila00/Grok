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
}
