// var sinon = require('sinon');
var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var app = require('../../../server/app')(db);

var supertest = require('supertest');

var User = db.model('user');
var Topic = db.model('topic');

describe('Topic route', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    var guestAgent, adminAgent;
    var adminUserInfo = {
        name: 'Obama',
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true
      };

    beforeEach('Create admin user', function(done) {
      return User.create(adminUserInfo)
        .then(function (newAdminUser) {
          done();
        }).catch(done);
    })

    beforeEach('Create agents', function (done) {
      guestAgent = supertest.agent(app);
      adminAgent = supertest.agent(app);
      adminAgent.post('/login')
      .send(adminUserInfo)
      .end(done);
    });

    describe('creating topics', function () {

      xit('any user can create a topic', function() {

      });

      xit('user-created topics should be pending status', function() {

      });

      xit('admin can approve topics created by ordinary users', function() {

      });

      xit('topics approved by admins are visible by ordinary users', function() {

      });

    });

    describe('retrieving topics', function () {

      beforeEach('Seed with topics', function() {
        return Topic.bulkCreate([{
          title: 'JavaScript',
          description: 'This. Is. JavaScript.',
          status: 'Approved'
        }, {
          title: 'Node',
          description: 'Dude, wheres your server?',
          status: 'Approved'
        }]);
      });

      it('all users can see all approved topics', function(done) {
        guestAgent.get('/api/topics')
          .expect(200)
          .end( function(err, res) {
            if (err) return done(err);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
            done();
          });
      });

      beforeEach('Add user-created topic', function() {
        return Topic.create({
          title: 'Express',
          description: 'Expressing servers since...2010ish?'
        });
      })

      it('non-admin users cannot see pending topics', function(done) {
        guestAgent.get('/api/topics')
        .expect(200)
        .end( function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          done();
        });
      });

      it('admin users can see all topics', function(done) {
        adminAgent.get('/api/topics')
        .expect(200)
        .end( function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(3);
          done();
        });
      })

    });

    describe('editing and deleting topics', function () {

      var topicId;

      beforeEach('Add a topic', function() {
        return Topic.create({
          title: 'JavaScript',
          description: 'This. Is. JavaScript.',
          status: 'Approved'
        })
        .then( function(newTopic) {
          topicId = newTopic.id;
        });
      });

      it('regular users cannot edit topics', function(done) {
        guestAgent.put('/api/topics/' + topicId)
        .send({ title: 'Ruby' })
        .expect(401)
        .end(done);
      });

      it('admin users can edit topics', function(done) {
        adminAgent.put('/api/topics/' + topicId)
        .send({ title: 'Ruby' })
        .expect(200)
        .end(function(err, res) {
          expect(res.body.title).to.equal('Ruby');
          done();
        });
      });

      it('regular users cannot delete topics', function(done) {
        guestAgent.delete('/api/topics/' + topicId)
        .expect(401)
        .end(done);
      });

      it('admin users can delete topics', function(done) {
        adminAgent.delete('/api/topics/' + topicId)
        .expect(200)
        .end(done);
      });

    });

    describe('topic associations', function () {
      xit('can pull all prerequisites with a topic', function() {

      });

      xit('can pull all subsequent topics with a topic', function() {

      });

    });

});
