'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('plan', {

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	decription:{
		type: Sequelize.TEXT,
		allowNull:false
	},
	resourceList:{
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull:false
	}

});