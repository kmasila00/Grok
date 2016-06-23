'use strict'
var db = require('../_db');


const Sequelize = require('sequelize')

module.exports = db.define('SubsequentTopic', {
    rating: {
      type: Sequelize.INTEGER
    }
  });
