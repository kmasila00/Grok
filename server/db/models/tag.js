var Sequelize= require('sequelize');

var db= require('../_db');

module.exports= db.define('tag', {
	name:{
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true
		}
	}
});
//some comment
