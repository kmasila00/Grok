'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('prerequisites', {
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
});
