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
      describe('any user can create a topic')
      describe('user-created topics should be pending status')
      describe('admin can approve topics created by ordinary users')
      describe('topics approved by admins are visible by ordinary users')
    });

    describe('retrieving topics', function () {
      describe('users can see all approved topics')
      describe('user cannot see pending topics')
    });

    describe('editing and deleting topics', function () {
      describe('only admins can edit topics')
      describe('only admins can delete topics')
    });

    describe('topic associations', function () {
      describe('can pull all prerequisites with a topic')
      describe('can pull all subsequent topics with a topic')
    });

});
