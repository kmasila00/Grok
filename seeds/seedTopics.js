'use strict';

const Promise = require('sequelize').Promise;
const Topic = require('../server/db').model('topic');

module.exports= function(){
	let topics= [
		{
			title: 'AngularJS',
			description: 'A framework that lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.',
			status: 'Approved'
		},
		{
			title: 'NodeJS',
			description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.',
			status: 'Approved'
		},
		{
			title: 'ExpressJS',
			description: 'A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
			status: 'Approved'
		},
		{
			title: 'JavaScript',
			description: 'A high-level, dynamic, untyped, and interpreted programming language. It has been standardized in the ECMAScript language specification.',
			status: 'Approved'
		}
	]

	let creatingTopics = topics.map((topicObj) => {
		console.log(topicObj);
	  return Topic.create(topicObj)
	})

	return Promise.all(creatingTopics);
}
