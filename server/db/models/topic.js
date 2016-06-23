'use strict'
var db = require('../_db');


const Sequelize = require('sequelize')

module.exports = db.define('topic', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });



