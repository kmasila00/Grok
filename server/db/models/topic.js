'use strict'
var db = require('../_db');
const Sequelize = require('sequelize')

module.exports = db.define('topic', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    status:{
      type: Sequelize.ENUM('Pending', 'Approved'),
      defaultValue: 'Pending',
      allowNull:false
    }
  },{
    hooks:{
      afterCreate: function(topic){
        Category.create({
          name: 'General',
          // can i just leave out the name since default value is general??
          status: 'Approved',
          topicId: topic.id
          // do i use "this" here to assign the topic id??
        })
        .then()
      }
    }
  });
