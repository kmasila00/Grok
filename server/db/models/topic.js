'use strict'
var db = require('../_db');
const Sequelize = require('sequelize')

module.exports = db.define('topic', {
    title: {
      type: Sequelize.STRING,
  		unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT
    },
    status:{
      type: Sequelize.ENUM('pending', 'approved'),
      defaultValue: 'pending',
      allowNull:false
    }
  });
