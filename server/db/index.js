'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Topic = require('./models/topic');
var Resource = require('./models/resource');
var Plan = require('./models/plan');
var Tag = require('./models/tag');


Topic.belongsToMany(Topic, {as:'prerequisite', through: 'PrerequisiteTopic'});
Topic.hasMany(Resource);
User.hasMany(Resource);
User.hasMany(Plan);
Topic.hasMany(Plan);
Plan.hasMany(Resource);
Resource.belongsToMany(Tag, {through: 'ResourceTag'});
Tag.belongsToMany(Resource, {through: 'ResourceTag'});
