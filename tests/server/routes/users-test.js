// Instantiate all models
var expect = require('chai').expect;

var Sequelize = require('sequelize');
var Promise = require('sequelize').Promise;
var dbURI = 'postgres://localhost:5432/testing-fsg';
var db = new Sequelize(dbURI, {
    logging: false
});
require('../../../server/db/models/user')(db);

var supertest = require('supertest');

describe('Users Route', function () {

    var app, User;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('users');
    });

    describe('testing users routes', function () {
        var users = [
            {
                name: 'fullstack',
                email: 'testing@fsa.com',
                password: '123',
                isAdmin: false
            },
            {
                name: 'grok',
                email: 'grok@gmail.com',
                password: 'grok',
                isAdmin: true
            }
        ];
        
        var creatingUsers = users.map(function (userObj) {
            return User.create(userObj);
        });
        
        var guestAgent;
            
        beforeEach('Create guest agent', function () {
            guestAgent = supertest.agent(app);
        });
        
        beforeEach('Create Users', function (done) {
                return Promise.all(creatingUsers);
        });
        
        it('can get all users', function (done) {
            guestAgent.get('/api/users')
                      .expect(200)
                      .end(function(err,response) {
                          if(err) return done(err);
                          expect(response.body).to.be.an('array');
                          expect(response.body).to.have.lengthOf(2);
                          expect(response.body[0].name).to.equal('fullstack');
                          expect(response.body[1].name).to.equal('grok');
                          done();
                      });
        });

        it('can add a User by ID', function (done) {
            guestAgent.get('/api/users/1')
                      .expect(200)
		      .end(function(err,response) {
                          if(err) return done(err);
                          expect(response.body).to.be.an('object');
                          expect(response.body.name).to.equal('fullstack');
                          expect(response.body.email).to.equal('testing@fsa.com');
                          expect(response.body.isAdmin).to.equal(false);
                          done();
                      });
        });

        it('can add a User to db',function(done){
            guestAgent.post('/api/users')
                      .send({
                          name: 'Saitama',
                          email: 'saitama@fs.com',
                          password: '123',
                          isAdmin: true
                      })
                      .expect(201)
                      .end(function(err,response) {
                          if(err) return done(err);
                          expect(response.body).to.be.an('object');
                          expect(response.body).to.have.any.keys('name','email','isAdmin');
                          expect(response.body.name).to.equal('Saitama');
                          expect(response.body.email).to.equal('saitama@fs.com');
                          expect(response.body.isAdmin).to.equal(true);
			  done();
                      })
        })

        it('can modify a User', function (done) {
            guestAgent.put('/api/users/1')
                      .send({ name: 'tacomaster' })
                      .expect(200)
		      .end(function(err,response) {
                          if(err) return done(err);
                          expect(response.body).to.be.an('object');
                          expect(response.body.name).to.equal('tacomaster');
                          expect(response.body.email).to.equal('testing@fsa.com');
                          expect(response.body.isAdmin).to.equal(false);
                          done();
                      });
        });

        it('can delete a User', function (done) {
            guestAgent.delete('/api/users/1')
                      .expect(204)
		      .end(function(err,response) {
                          if(err) return done(err);
                          done();
                      });
        });

    });
});

