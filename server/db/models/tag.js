var Sequelize= require('sequelize');

var db= require('../_db');

module.exports= db.define('tag', {
	name:{
		type: Sequelize.STRING,
		allowNull: false
	}
});
//some comment