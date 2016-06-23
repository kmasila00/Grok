// var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var User = db.model('user');
var Topic = db.model('topic');
var Prerequisite = db.model('prerequisite');

describe('Topic model', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    describe('creating topics', function () {
      describe('can create a topic with a title and description')
      describe('cannot create a topic with a blank title')
      describe('cannot create a topic with a blank description')
    });

    describe('topic associations', function () {
      describe('can add a prerequisite topic')
      describe('can add a subsequent topic')
    });

    describe('prerequisite ratings', function() {
      describe('prerequisite-topic relationship upvote rating is 0 by default')
      describe('can upvote a prerequisite-topic relationship')
    })

});
