'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Topic = require('./models/topic');
var Prerequisite= require('./models/prerequisites');
var RelatedTopic = require('./models/subsequent');


Topic.belongsToMany(Topic, {as:'prerequisite', through: 'PrerequisiteTopic'});

Topic.belongsToMany(Topic, {as:'subsequent', through: 'SubsequentTopic'});