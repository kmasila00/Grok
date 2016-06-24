'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Topic = require('./models/topic');
var Resource = require('./models/resource');
var Plan = require('./models/plan');
var Tag = require('./models/tag');
var Vote = require('./models/vote');
var Prerequisite = require('./models/prereq');

Topic.belongsToMany(Topic, {as:'prerequisite', through: Prerequisite});
Topic.hasMany(Resource);
User.hasMany(Resource);
User.hasMany(Plan);
Topic.hasMany(Plan);
Plan.hasMany(Resource);
Resource.belongsToMany(Tag, {through: 'ResourceTag'});


User.belongsToMany(Resource, {through: Vote.voteResource})
User.belongsToMany(Plan, {through: Vote.votePlan})
User.belongsToMany(Prerequisite, {through: Vote.voteRelationship})

