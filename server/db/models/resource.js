'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('resource', {
	name:{
		type: Sequelize.STRING
	},
	url:{
		type: Sequelize.STRING,
		allowNull: false
	},
	rating:{
		type: Sequelize.STRING,
		defaultValue: 0
	}
});