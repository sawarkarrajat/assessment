// process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');

describe('dummy', () => {
	test('just checking env', () => {
		// expect(reconverted).not.toMatch('sdfasdf');
		console.log('current env', process.env.NODE_ENV);
	});
});