'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('resource', {
	name:{
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	url:{
		type: Sequelize.STRING,
		allowNull: false,
		notEmpty: true
	},
	type:{
		type: Sequelize.ENUM('article', 'video', 'tutorial', 'other'),
		allowNull: false,
		defaultValue: 'other'
	},
	status:{
		type: Sequelize.ENUM('Pending', 'Approved'),
		defaultValue: 'Pending',
		allowNull:false
	}
});
