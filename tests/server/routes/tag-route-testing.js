var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');
var app = require('../../../server/app')(db);

var supertest = require('supertest');

var Resource = db.model('resource');
var Tag = db.model('tag');

describe('Tag route', function () {

    beforeEach('Sync DB', function () {
       return db.sync({ force: true });
    });

    var guestAgent, loggedInAgent, adminAgent;
    var userInfo = {
        name: 'Some guy',
        email: 'abc@xyz.com',
        password: '1234'
      },
      adminUserInfo = {
        name: 'Obama',
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true
      };

    beforeEach('Create user', function(done) {
      return User.create(userInfo)
        .then(done)
        .catch(done);
    })

    beforeEach('Create agents', function (done) {
      guestAgent = supertest.agent(app);
      loggedInAgent = supertest.agent(app);
      loggedInAgent.post('/login')
      .send(userInfo)
      .end(done);
    });

    describe('Tagging resources', function () {

      var tag = 'youre-it';

      beforeEach('Create resource', function(done) {
        var resourceToAdd = {
          name: 'A resource',
          url: 'http://www.google.com',
          status: 'Approved'
        };
        Resource.create(resourceToAdd);
      });

      it('non-logged in users cannot tag resources', function(done) {
        guestAgent.post('/api/resources/1/tag')
        .send(tag)
        .expect(401)
        .end(done);
      });

      it('logged in users can tag resources', function(done) {
        loggedInAgent.post('/api/resources/1/tag')
        .send(tag)
        .expect(201)
        .end( function(err, res) {
          if (err) return done(err);
          expect(res.body.tags).to.be.an('array');
          expect(res.body.tags).to.not.have.deep.property(tag);
          done();
        });
      });

    });

    describe('removing tags', function () {

      beforeEach('Create admin agent', function (done) {
        adminAgent = supertest.agent(app);
        adminAgent.post('/login')
        .send(adminUserInfo)
        .end(done);
      });

      beforeEach('Add tagged resources', function(done) {
        var resourceToAdd = [{
              name: 'A resource',
              url: 'http://www.google.com',
              status: 'Approved'
            },
            tag = 'no-yourre-it';

        Resource.bulkCreate(resourceToAdd)
        .then( function(resource) {
          resource.addTag(tag);
        };
      });

      it('non-logged in users cannot untag resources', function(done) {
        guestAgent.delete('/api/resources/1/tag/1')
        .expect(401)
        .end(done);
      });

      it('logged in users cannot untag resources', function(done) {
        loggedInAgent.delete('/api/resources/1/tag/1')
        .expect(401)
        .end(done);
      });

      it('admin users can untag resources', function(done) {
        adminAgent.delete('/api/resources/1/tag/1')
        .expect(200)
        .end( function(err, res) {
          if (err) return done(err);
          Resource.findById(1, { include: [Tag] })
          .then( function(resource) {
            expect(resource.tags).to.be.an('array');
            expect(resource.tags.length).to.equal(0);
            done();
          })
        });
      });

});
