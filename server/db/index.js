'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Topic = require('./models/topic');
var Prerequisite= require('./models/prerequisites');
var Resource = require('./models/resource');
var Tag = require('./models/tag');


Topic.belongsToMany(Topic, {as:'prerequisite', through: 'PrerequisiteTopic'});
User.hasMany(Resource);
Resource.belongsToMany(Tag, {through: 'ResourceTag'});

