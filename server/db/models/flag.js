'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var flaggedResource = db.define('flaggedResource', {
	reason: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

var flaggedTopic = db.define('flaggedTopic', {
	reason: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = {
	flaggedResource: flaggedResource,
	flaggedTopic: flaggedTopic
}