// var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var User = db.model('user');
var Topic = db.model('topic');

describe('Topic routes', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    describe('creating topics', function () {
      describe('any user can create a topic', function() {

      })
      describe('user-created topics should be pending status', function() {

      })
      describe('admin can approve topics created by ordinary users', function() {

      })
      describe('topics approved by admins are visible by ordinary users', function() {

      })
    });

    describe('retrieving topics', function () {
      describe('users can see all approved topics', function() {

      })
      describe('user cannot see pending topics', function() {

      })
    });

    describe('editing and deleting topics', function () {
      describe('only admins can edit topics', function() {

      })
      describe('only admins can delete topics', function() {

      })
    });

    describe('topic associations', function () {
      describe('can pull all prerequisites with a topic', function() {

      })
      describe('can pull all subsequent topics with a topic', function() {

      })
    });

});
