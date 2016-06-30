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
var Flag= require('./models/flag');

// User Associations
User.belongsToMany(Resource, {through: Vote.voteResource});
User.hasMany(Resource);
User.belongsToMany(Plan, {through: Vote.votePlan});
User.hasMany(Plan);
User.belongsToMany(Prerequisite, {through: Vote.voteRelationship});

// Topic Associations
Topic.belongsToMany(Topic, {as:'prerequisite', through: Prerequisite});
Topic.belongsToMany(Resource, {through: 'ResourceTopic'});
Topic.belongsToMany(User, {as: 'topicFlaggers', through: Flag.flaggedTopic});
Topic.hasMany(Plan);

// Resource Associations
Resource.belongsToMany(User, {as: 'ResourceFlaggers', through: Flag.flaggedResource});
Resource.belongsToMany(Topic, {through: 'ResourceTopic'});
Resource.belongsToMany(Tag, {through: 'ResourceTag'});

// Plan Associations
Plan.belongsToMany(Resource, {through: 'PlanResource'});

