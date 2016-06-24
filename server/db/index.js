'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Topic = require('./models/topic');
var Prerequisite= require('./models/prerequisites');
var Resource = require('./models/resource');
var Plan = require('./models/plan');


Topic.belongsToMany(Topic, {as:'prerequisite', through: 'PrerequisiteTopic'});
Topic.hasMany(Resource);
User.hasMany(Resource);
User.hasMany(Plan);
Topic.hasMany(Plan);
Plan.hasMany(Resource);

