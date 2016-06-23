'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');


var Category = require('./models/category');
var Resource = require('./models/resource');


Category.hasMany('Resource');
