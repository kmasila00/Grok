'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var flaggedResource = db.define('flaggedResource', {
	id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
	},
	reason: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

var flaggedTopic = db.define('flaggedTopic', {
	id: {
	  type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
	},
	reason: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = {
	flaggedResource: flaggedResource,
	flaggedTopic: flaggedTopic
}