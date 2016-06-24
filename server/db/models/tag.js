var Sequelize= require('sequelize');

var db= require('../_db');

module.exports= db.define('tags', {
	name: Sequelize.STRING,
	allowNull: false
})