'use strict';

const Promise = require('bluebird');
const Resource = require('../server/db').model('resource');
const Tag = require('../server/db').model('tag');
const Topic = require('../server/db').model('topic');

module.exports = function(){
	var resourcesToAdd = [
    {
			name: 'CodeSchool: JavaScript Road Trip',
      url: 'https://www.codeschool.com/courses/javascript-road-trip-part-1',
      type: 'tutorial',
      topics: ['JavaScript'],
      tags: ['JavaScript','basics'],
      status: 'approved'
		},{
			name: 'CodeSchool: Try jQuery',
      url: 'https://www.codeschool.com/courses/try-jquery',
      type: 'tutorial',
      topics: ['jQuery'],
      tags: ['JavaScript','jQuery'],
      status: 'approved'
		},{
			name: 'CodeSchool: Shaping up with Angular.js',
      url: 'https://www.codeschool.com/courses/shaping-up-with-angular-js',
      type: 'tutorial',
      topics: ['AngularJS'],
      tags: ['JavaScript','AngularJS'],
      status: 'approved'
		},{
			name: 'CodeSchool: Real-time Web with Node.js',
      url: 'https://www.codeschool.com/courses/real-time-web-with-node-js',
      type: 'tutorial',
      topics: ['Node.js'],
      tags: ['JavaScript','Node.js'],
      status: 'approved'
		},{
			name: 'CodeSchool: Building Blocks of Express.js',
      url: 'https://www.codeschool.com/courses/building-blocks-of-express-js',
      type: 'tutorial',
      topics: ['Express.js'],
      tags: ['JavaScript','Node.js','Express.js'],
      status: 'approved'
		},{
			name: 'DOM Enlightment',
      url: 'http://www.domenlightenment.com/',
      type: 'article',
      topics: ['JavaScript'],
      tags: ['JavaScript','jQuery','DOM','AngularJS'],
      status: 'approved'
		},{
			name: 'How Browsers Work',
      url: 'http://www.html5rocks.com/en/tutorials/internals/howbrowserswork/',
      type: 'article',
      topics: ['jQuery','AngularJS'],
      tags: ['JavaScript','jQuery','DOM','AngularJS'],
      status: 'approved'
		},{
			name: 'Node.js Documentation',
      url: 'https://nodejs.org/en/docs/',
      type: 'documentation',
      topics: ['Node.js'],
      tags: ['JavaScript','Node.js'],
      status: 'approved'
		},{
			name: 'Express.js Routing',
      url: 'http://expressjs.com/en/guide/routing.html',
      type: 'article',
      topics: ['Express.js'],
      tags: ['JavaScript','Node.js','Express.js'],
      status: 'approved'
		},{
			name: 'Express.js Documentation',
      url: 'http://expressjs.com/en/4x/api.html',
      type: 'documentation',
      topics: ['Express.js'],
      tags: ['JavaScript','Node.js','Express.js'],
      status: 'approved'
		},{
			name: 'Build Your Own AngularJS',
      url: 'http://teropa.info/build-your-own-angular/build_your_own_angularjs_sample.pdf',
      type: 'book',
      topics: ['AngularJS'],
      tags: ['JavaScript','AngularJS'],
      status: 'approved'
		},{
			name: 'Understanding Passport.js Authentication Flow',
      url: 'http://toon.io/understanding-passportjs-authentication-flow/',
      type: 'article',
      topics: ['Passport.js'],
      tags: ['JavaScript','Node.js','Express.js','Passport.js'],
      status: 'approved'
		},{
			name: 'Digging into Angular\'s "Controller as" syntax',
      url: 'https://toddmotto.com/digging-into-angulars-controller-as-syntax/',
      type: 'article',
      topics: ['JavaScript'],
      tags: ['JavaScript','AngularJS'],
      status: 'approved'
		},{
			name: 'React Tutorial: Cloning Yelp',
      url: 'https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/',
      type: 'tutorial',
      topics: ['React'],
      tags: ['JavaScript','React','DOM'],
      status: 'approved'
		},{
			name: 'React Documentation',
      url: 'https://facebook.github.io/react/docs/getting-started.html',
      type: 'documentation',
      topics: ['React'],
      tags: ['JavaScript','React','DOM'],
      status: 'approved'
		},{
			name: 'Learn React.js in a weekend!',
      url: 'https://nodecasts.io/learn-react-js-weekend/',
      type: 'tutorial',
      topics: ['React'],
      tags: ['JavaScript','React','DOM'],
      status: 'approved'
		},{
			name: 'You Don\'t Know JS',
      url: 'https://github.com/getify/You-Dont-Know-JS',
      type: 'book',
      topics: ['JavaScript'],
      tags: ['JavaScript','basics'],
      status: 'approved'
		},{
			name: 'D3 on AngularJS',
      url: 'http://www.ng-newsletter.com/posts/d3-on-angular.html',
      type: 'article',
      topics: ['AngularJS','D3.js'],
      tags: ['JavaScript','AngularJS','D3.js','visualization','SVG'],
      status: 'approved'
		},{
			name: 'D3.js Documentation',
      url: 'https://d3js.org/',
      type: 'documentation',
      topics: ['D3.js'],
      tags: ['JavaScript','D3','visualization','SVG'],
      status: 'approved'
		},{
			name: 'Learn D3.js Basics by Planing a Vegetable Garden',
      url: 'https://www.rtfmanual.io/d3garden/?utm_source=javascriptweekly&utm_medium=email',
      type: 'tutorial',
      topics: ['D3.js'],
      tags: ['JavaScript','D3','visualization','SVG'],
      status: 'approved'
		},{
			name: 'Atlassian Git Tutorial',
      url: 'https://www.atlassian.com/git/tutorials/what-is-version-control',
      type: 'tutorial',
      topics: ['Git'],
      tags: ['git','version_control'],
      status: 'approved'
		},{
			name: 'Building a Multi-Line Chart Using D3.js',
      url: 'http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935',
      type: 'tutorial',
      topics: ['D3.js'],
      tags: ['JavaScript','D3','visualization','SVG'],
      status: 'approved'
		},{
			name: 'A Complete Guide to Flexbox',
      url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
      type: 'article',
      topics: ['Flexbox'],
      tags: ['JavaScript','CSS','Flexbox'],
      status: 'approved'
		},{
			name: 'd3Vienno d3 Tutorials',
      url: 'https://www.youtube.com/watch?v=n5NcCoa9dDU&list=PLEXqkjhEUCf3cEWddeBggyWy_e4FD-9p1',
      type: 'video',
      topics: ['D3.js'],
      tags: ['JavaScript','D3','visualization','SVG'],
      status: 'approved'
		}
	];

	// pull out all tags & topics
	var tags = [], tagsToAdd = [],
			topics = [], topicsToAdd = [];
	resourcesToAdd.forEach( function(resource) {
		tags = tags.concat(resource.tags);
		topics = topics.concat(resource.topics);
	});
	tags.forEach( function(tag) {
		if(tagsToAdd.indexOf(tag) < 0) tagsToAdd.push({ name: tag });
	});
	topics.forEach( function(topic) {
		if(topicsToAdd.indexOf(topic) < 0) topicsToAdd.push({ title: topic, status: 'approved' });
	});

	var dbResources, dbTags, dbTopics;

	console.log('Creating resources...')
	return Promise.all(
		[ Resource.bulkCreate(resourcesToAdd) ].concat(
			tagsToAdd.map( function(tag) {
				return Tag.findOrCreate({ where: { name: tag.name }});
			}),
			topicsToAdd.map( function(topic) {
				return Topic.findOrCreate({ where: { title: topic.title, status: topic.status }});
			})
	))
	.then( function() {
		// bulkCreate's resolved value doesn't include an ID - must also run findAll
		// also need to find all topics/tags, including those not added above
		return Promise.all([
			Resource.findAll({}),
			Topic.findAll({}),
			Tag.findAll({})
		]);
	})
	.spread( function(dbResources, dbTopics, dbTags) {
		var seedIdx, tagsToAssociate = [], creatingAssociations = [];
		console.log('Adding resource->tag associations...');
		creatingAssociations.push(
			dbResources.map( function(resource) {
				seedIdx = findIndexByName(resourcesToAdd, resource.name);
				tagsToAssociate = resourcesToAdd[seedIdx].tags.map( function(tag) {
					return dbTags[findIndexByName(dbTags, tag)].id;
				});
				return resource.addTags(tagsToAssociate);
			})
		);

		dbResources.forEach( function(dbResource) {
			var resourcesToAddIdx = findIndexByName(resourcesToAdd, dbResource.name);
			resourcesToAdd[resourcesToAddIdx].topics.forEach( function(topic) {
				var dbTopicIdx = findIndexByName(dbTopics, topic);
				creatingAssociations.push(
					dbResource.addTopic(dbTopics[dbTopicIdx].id)
				);
			})
		});

		return Promise.all(creatingAssociations);
	})

};


function findIndexByName(arr, name) {
	for(var i=0; i<arr.length; i++) {
		if(arr[i].name === name || arr[i].title === name) return i;
	}
	return -1;
}
