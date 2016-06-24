var expect= require('chai').expect;

var Sequelize= require('sequelize');

var db= require('../../../server/db');
var app= require('../../../server/app')(db);

var supertest= require('supertest');

var Resource= db.model('resource');

describe('Resource Route', function(){

	beforeEach('Sync DB', function () {
	   return db.sync({ force: true });
	});

	var guestAgent, adminAgent;
	var user = {
	    name: 'grok',
	    email: 'grok@gmail.com',
	    password: 'grok',
	    isAdmin: true
	};
	var resources= [
	{
		name: 'AngularJS Intro',
		url: 'http://www.w3schools.com/angular/angular_intro.asp',
		type: 'tutorial',
		status: 'Approved'

	},
	{
		name: 'ExpressJS Intro',
		url: 'https://www.upwork.com/hiring/development/express-js-a-server-side-javascript-framework/',
		type: 'article',
		status: 'Pending'
	},
	{
		name: 'ReactJS',
		url: 'https://www.youtube.com/watch?v=8HkVHbJZeWY',
		type: 'video',
		status: 'Approved'
	}]

	beforeEach('Create user', function (done) {
	    return User.create(user)
	               .then(function(newUser) {
	                   done();
	               }).catch(done);
	});

	beforeEach('Create resources', function(done){
		var createdResources= resources.map(resource => Resource.create(resource));
		return Promise.all(createdResources);
	})

	beforeEach('Create agents', function (done) {
	    guestAgent = supertest.agent(app);
	    adminAgent = supertest.agent(app);
	    adminAgent.post('/login')
	              .send(user)
	              .end(done);
	});

	it('GET /resources', function(done){
		return agent.get('api/resources').expect(200)
		.then(res =>{
			expect(res.body).to.be.instanceof(Array);
			expect(res.body).to.have.length(3);
		})
	});













})

