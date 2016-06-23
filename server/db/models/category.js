'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('category', {
	name:{
		type: Sequelize.STRING,
		defaultValue: 'General', // when Topic is created, at least one "general" category is also created
		allowNull: false,
		notEmpty: true
	},
	status:{
		type: Sequelize.ENUM('Pending', 'Approved'),
		defaultValue: 'Pending',
		allowNull:false
	}
});
