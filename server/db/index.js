'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Topic = require('./models/topic');
var Prerequisite= require('./models/prerequisites');
var Category = require('./models/category');
var Resource = require('./models/resource');


Topic.belongsToMany(Topic, {as:'prerequisite', through: 'PrerequisiteTopic'});
Topic.hasMany(Category);
Category.hasMany(Resource);


