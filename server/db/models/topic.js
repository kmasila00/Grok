'use strict'
var db = require('../_db');
const Sequelize = require('sequelize')

var Category = require('./category');

module.exports = db.define('topic', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
       notEmpy: true
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING)
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


