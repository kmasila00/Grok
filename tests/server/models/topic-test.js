// var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var User = db.model('user');
var Topic = db.model('topic');
var PrerequisiteTopic = db.model('PrerequisiteTopic');
// Topic.belongsToMany(Topic, {as:'prerequisite', through: 'PrerequisiteTopic'});

describe('Topic model', function () {

    beforeEach('Sync DB', function () {
      return db.sync({ force: true });
    });

    describe('creating topics', function () {

      it('can create a topic with a title and description', function() {
        var validTopic = {
          title: 'JavaScript',
          description: 'Greatest programming language ever, or greatest language ever?'
        };
        Topic.create(validTopic)
        .then( function(newTopic) {
          expect(newTopic.title).to.equal(validTopic.title);
        });
      });

      it('cannot create a topic with a blank title', function() {
        Topic.create({ description: 'Something' })
        .then( function(newTopic) {
          expect(newTopic).to.be.undefined;
        });
      });

      it('cannot create a topic with a blank description', function() {
        Topic.create({ title: 'A title' })
        .then( function(newTopic) {
          expect(newTopic).to.be.undefined;
        });
      });
    });

    describe('topic associations', function () {

      var baseTopic;

      beforeEach('Add a base topic', function() {
        var validTopic = {
          title: 'Node',
          description: 'Master of the serveriverse?'
        };
        baseTopic = Topic.create(validTopic);
      });

      it('can add a prerequisite topic', function() {
        var topic = {
          title: 'JavaScript',
          description: 'Greatest programming language ever, or greatest language ever?'
        };
        Topic.create(topic)
        .then( function(newTopic) {
          return baseTopic.addPrerequisite(newTopic);
        })
        .then( function(x) {

        });
      });

      it('can add a subsequent topic', function() {

      })
    });

    describe('prerequisite ratings', function() {
      it('prerequisite-topic relationship upvote rating is 0 by default', function() {

      });

      it('can upvote a prerequisite-topic relationship', function() {

      });
    })

});
